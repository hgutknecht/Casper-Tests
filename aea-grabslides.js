/*
 * Requires Casperjs, Phantomjs
 * author: Hans Gutknecht
 *
 * Download all the PDFs from the An Event Apart DC super ultra secret website
 * Just insert the secret URL in the casper.start
 *
 */

function getSlides() {
  // Grab all the slide refs
  var matches = document.querySelectorAll('h3 a');
  return Array.prototype.map.call(matches, function(e) {
    return e.href
 });
}

var casper = require("casper").create();

// Insert the secret URL below in the quote
casper.start("http://TheSecretURL", function() {
  var slides = this.evaluate(getSlides);
  this.echo(slides.length + ' slidedecks found: Downloading.' + '\n');
  for (var i = 0; i < slides.length; i++) {
    this.download(slides[i], 'slideset-' + i + '.pdf');
  }
});

casper.run();