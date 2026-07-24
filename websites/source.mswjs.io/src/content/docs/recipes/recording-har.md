---
order: 1
title: Recording HAR
description: Learn how to record HAR files in the browser.
---

You can record the network of your application using your browser's DevTools. Once recorded, you can import the `*.har` file in your code to [generate request handlers from a network archive](/docs/integrations/har).

Below, you can find detailed instructions on how to record HAR files in all of the modern browsers.

## Chrome

1. Open the DevTools (<kbd>⌘ + ⌥ + I</kbd> on MacOS; <kbd>Ctrl + Shift + I</kbd> on Windows/Linux
   <kbd>⌘ + ⌥ + I</kbd> on MacOS; <kbd>Ctrl + Shift + I</kbd> on Windows/Linux);
1. Click on the "Network" tab in the DevTools;
1. Click the <kbd>⤓</kbd> (Export HAR...) icon;
1. Choose where to save the HAR file.

## Firefox

1. Open the Dev Tools (<kbd>⌘ + ⌥ + I</kbd> on MacOS; <kbd>Ctrl + Shift + I</kbd> on Windows/Linux);
1. Click on the "⇅ Network" tab in the Dev Tools;
1. Click on the <kbd>⚙</kbd> icon next to the throttling settings;
1. Choose "Save all as HAR";
1. Choose where to save the HAR file.

## Safari

1. Open the Dev Tools (<kbd>⌘ + ⌥ + I</kbd>);
1. Click on the "⇅ Network" tab in the Dev Tools;
1. Click on the <kbd>Export</kbd> button;
1. Choose where to save the HAR file.
