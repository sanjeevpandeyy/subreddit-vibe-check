# Reddit API App Creation Error

## Issue

While creating a Reddit application from the Reddit Developer Apps page, the application form was completed with the required details.

The intended application type was:

* **Web App**
* **Name:** Subreddit Vibe Check
* **Description:** Reddit dashboard for analyzing subreddit posts and sentiment
* **About URL:** Project URL / localhost
* **Redirect URI:** Local backend callback URL

However, after clicking **Create app**, Reddit returned the following error:

```text
An error occurred (status: 500)
```

## Error

```text
create app
An error occurred (status: 500)
```

This appears to be a server-side error from Reddit while processing the application creation request rather than an error in the local project.

## Project Configuration

The backend is configured to use Reddit API credentials through environment variables:

```env
PORT=4000

REDDIT_CLIENT_ID=mock_client_id
REDDIT_CLIENT_SECRET=mock_client_secret
REDDIT_USER_AGENT=subreddit-vibe-check/1.0

REDDIT_USE_MOCK=false
```

At the moment, valid Reddit API credentials cannot be generated because the Reddit Developer App creation page is returning HTTP 500.

## Impact

Without a valid Reddit `client_id` and `client_secret`, the application cannot authenticate against Reddit's live API.

Therefore:

1. The frontend and backend can be developed and tested locally.
2. The Reddit API integration is implemented.
3. Live Reddit API requests require valid credentials.
4. Deployment using the live Reddit API should be completed after Reddit app registration becomes available.

## Current Status

**Application status:** Blocked by Reddit Developer App registration

**Error:** HTTP 500

**Local project:** Working

**Git repository:** Local repository created successfully

**Reddit credentials:** Not available because Reddit app creation is failing

## Next Step

Retry Reddit Developer App creation later. If the Reddit Developer portal continues returning HTTP 500, verify that:

* The Reddit account can access the Developer Apps page.
* The required Developer Terms and Data API Terms have been accepted.
* The application name is valid.
* `web app` is selected as the application type.
* A valid redirect URI is provided.
* Reddit's API registration service is operational.

Once the application is successfully created, replace the placeholder credentials in `server/.env`:

```env
REDDIT_CLIENT_ID=<actual_client_id>
REDDIT_CLIENT_SECRET=<actual_client_secret>
REDDIT_USER_AGENT=subreddit-vibe-check/1.0
REDDIT_USE_MOCK=false
```

**Important:** Never commit `.env` or Reddit API credentials to GitHub or any public repository.
