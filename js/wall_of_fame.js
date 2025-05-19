"use strict";

/**
 * Wall of Fame JS - Source file
 */
(function ($, Drupal) {
  "use strict";

  /**
   * Wall of Fame behavior.
   */
  Drupal.behaviors.wallOfFame = {
    /**
     * Attach function for behavior.
     *
     * @param {object} context
     *   The context for attaching the behavior.
     * @param {object} settings
     *   Drupal settings object.
     */
    attach: function (context, settings) {
      // Find all wall of fame paragraphs once
      $(".wall-of-fame-wrapper", context).once("wallOfFame").each(function () {
        const $wallOfFame = $(this);

        // Add entrance animation
        handleAnimation($wallOfFame);

        // Add click handlers
        setupEventHandlers($wallOfFame);
      });
    }
  };

  /**
   * Add entrance animations to wall of fame elements.
   *
   * @param {jQuery} $element
   *   The jQuery object representing the wall of fame element.
   */
  function handleAnimation($element) {
    // Check if element is in viewport on page load
    checkVisibility($element);

    // Listen for scroll to check visibility
    $(window).on("scroll", function () {
      checkVisibility($element);
    });
  }

  /**
   * Check if element is visible in viewport and animate if so.
   *
   * @param {jQuery} $element
   *   The jQuery object to check visibility for.
   */
  function checkVisibility($element) {
    const windowHeight = $(window).height();
    const elementTop = $element.offset().top;
    const scrollTop = $(window).scrollTop();
    const elementVisible = 150;
    if (elementTop < scrollTop + windowHeight - elementVisible && elementTop + $element.height() > scrollTop) {
      $element.addClass("animated");
    }
  }

  /**
   * Set up click and hover event handlers.
   *
   * @param {jQuery} $element
   *   The jQuery object to attach events to.
   */
  function setupEventHandlers($element) {
    // Example: Toggle expanded state on title click
    $(".winner-title", $element).on("click", function () {
      $(this).closest(".winner").toggleClass("expanded");
    });
  }
})(jQuery, Drupal);