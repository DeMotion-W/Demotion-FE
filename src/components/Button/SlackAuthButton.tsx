"use client";

export default function SlackAuthButton() {
  return (
    <a
      href="https://slack.com/oauth/v2/authorize?client_id=8911185662502.8916041409397&scope=incoming-webhook,chat:write,channels:read,groups:read,im:write&user_scope="
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        alt="Add to Slack"
        height={40}
        width={139}
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
      />
    </a>
  );
}
