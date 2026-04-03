---
author: Gyan Lakhwani
date: 03-04-2026
feed: show
layout: blog
subtitle: "How the Public Knowledge Studio email signature is hosted, why it broke when we moved to Framer, and how we fixed it"
tags: []
banner: /assets/img/email-signature-example.jpg
title: "How Our Email Signature Works"
---

## How email signatures with images work

Images in emails can be included in one of two ways: embedded as attachments (the image data travels with the email itself), or loaded from a URL on the web (the email client fetches the image each time the email is opened).

The Public Knowledge Studio email signature uses a web-hosted image. When someone opens an email with our signature, their email client loads the image from: `https://publicknowledge.co/assets/img/email-signature.png`

This approach has a useful side effect: if we update the image at that URL, the new version appears in every email that gets reopened — including emails already sent. All future emails automatically pick up the change too. We only have to update the image in one place.

## Setting up the signature in Gmail

1. Open Gmail and go to **Settings → See all settings → General**

   ![Email signature example 1](/assets/img/email-signature-1.jpg)

2. Scroll down to **Signature** and create a new one (or edit your existing one)
3. Use the image insert button and paste the URL:
   `https://publicknowledge.co/assets/img/email-signature.png`
   — or copy the signature directly from a colleague's email and paste it in

   ![Email signature example 2](/assets/img/email-signature-2.jpg)

4. Set the signature to appear on new emails and replies. 
5. Save changes

Because the image is loaded from a URL, you don't need to re-upload anything if the signature design changes in the future — it'll update automatically the next time your email is opened.


## What broke when we moved to Framer

When we migrated the main Public Knowledge website to Framer, the image at `/assets/img/email-signature.png` no longer existed, so the signature broke across all past and future emails — the image just wouldn't load.

We could have changed the signature in Gmail to point to the new location, but that would only work for new emails we sent - the signature image would still be broken in every past email. To fix this, we used Cloudflare Worker (a small service worker that runs at the edge) that intercepts requests to `publicknowledge.co/assets/img/email-signature.png` and redirects them to the correct static image hosted elsewhere. This restored the signature for everyone without any changes needed on the Gmail side.


