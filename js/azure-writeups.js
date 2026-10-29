/**
 * AZURE WRITEUPS
 * ------------------------------------------------------------
 * Same source as js/writeups.js (writeups.json) filtered to
 * category: "azure" — set that meta tag on a writeup page to have
 * it show up in the Azure page's writeups tab instead of the main
 * writeups list.
 * ------------------------------------------------------------
 */

fetch("writeups.json")
  .then(r => r.json())
  .then(items => {
    const azureOnly = items.filter(w => w.category === "azure");
    renderWriteupList(azureOnly, "azure-writeup-list");
  })
  .catch(() => {
    renderWriteupList([], "azure-writeup-list");
  });