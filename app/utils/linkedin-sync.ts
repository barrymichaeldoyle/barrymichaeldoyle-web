// Option 1: Using Clearbit (free tier available)
export async function getLinkedInProfileFromClearbit(email: string) {
  try {
    const response = await fetch(
      `https://person.clearbit.com/v1/people/email/${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLEARBIT_API_KEY}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        profilePictureUrl: data.avatar,
        name: data.name?.fullName,
        company: data.employment?.name,
      };
    }
  } catch (error) {
    console.error('Clearbit API error:', error);
  }
  return null;
}

// Option 2: Using public LinkedIn profile URL (less reliable but free)
export async function getLinkedInProfileFromPublicUrl(
  linkedinUsername: string
) {
  try {
    // This approach scrapes the public LinkedIn profile
    // Note: This can break if LinkedIn changes their structure
    const response = await fetch(
      `https://www.linkedin.com/in/${linkedinUsername}/`
    );
    const html = await response.text();

    // Extract profile image from the HTML (requires cheerio or similar)
    const imageMatch = html.match(
      /profile-photo-edit__preview[^>]*src="([^"]+)"/
    );

    if (imageMatch && imageMatch[1]) {
      return {
        profilePictureUrl: imageMatch[1],
        lastUpdated: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
  }
  return null;
}

// Option 3: Webhook approach - update when you change your LinkedIn
export async function triggerLinkedInSync(webhookUrl: string) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trigger: 'linkedin_profile_update',
        timestamp: new Date().toISOString(),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Webhook trigger error:', error);
    return false;
  }
}
