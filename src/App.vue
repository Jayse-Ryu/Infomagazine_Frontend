<template>
  <div id="app">

    <!-- Header component -->
    <transition name="fade">
      <div v-if="header_flag === 0" key="no_header"></div>
      <app-header v-else-if="header_flag === 1" key="header" />
    </transition>

    <!-- Router component -->
    <transition name="fade">
      <router-view/>
    </transition>



  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    // Header options
    header_flag: 1,
    auth_user: '',
  })
}
</script>

<style lang="scss">
  /* Import Nanum square font here. */
  /*@import url(https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css);*/

  /*! normalize.css v3.0.2 | MIT License | git.io/normalize */

  /**
   * 1. Set default font family to sans-serif.
   * 2. Prevent iOS text size adjust after orientation change, without disabling
   *    user zoom.
   */

  @font-face {
    src: url('assets/common/fonts/Nanums_regular.ttf') format('ttf'),
    url('assets/common/fonts/Nanums_regular.woff') format('woff'),
    url('assets/common/fonts/Nanums_bold.ttf') format('ttf'),
    url('assets/common/fonts/Nanums_bold.woff') format('woff'),
    url('assets/common/fonts/Nanums_light.ttf') format('ttf'),
    url('assets/common/fonts/Nanums_light.woff') format('woff');
  }

  html {
    font-family: Impact, 'Nanums_regular', 'Nanums_bold', 'Nanums_light', sans-serif; /* 1 */
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove default margin.
   */

  body {
    margin: 0;
  }

  /* HTML5 display definitions
     ========================================================================== */

  /**
   * Correct `block` display not defined for any HTML5 element in IE 8/9.
   * Correct `block` display not defined for `details` or `summary` in IE 10/11
   * and Firefox.
   * Correct `block` display not defined for `main` in IE 11.
   */

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  /**
   * 1. Correct `inline-block` display not defined in IE 8/9.
   * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.
   */

  audio,
  canvas,
  progress,
  video {
    display: inline-block; /* 1 */
    vertical-align: baseline; /* 2 */
  }

  /**
   * Prevent modern browsers from displaying `audio` without controls.
   * Remove excess height in iOS 5 devices.
   */

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  /**
   * Address `[hidden]` styling not present in IE 8/9/10.
   * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.
   */

  [hidden],
  template {
    display: none;
  }

  /* Links
     ========================================================================== */

  /**
   * Remove the gray background color from active links in IE 10.
   */

  a {
    background-color: transparent;
  }

  /**
   * Improve readability when focused and also mouse hovered in all browsers.
   */

  a:active,
  a:hover {
    outline: 0 !important;
  }

  /* Text-level semantics
     ========================================================================== */

  /**
   * Address styling not present in IE 8/9/10/11, Safari, and Chrome.
   */

  abbr[title] {
    border-bottom: 1px dotted;
  }

  /**
   * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.
   */

  b,
  strong {
    font-weight: bold;
  }

  /**
   * Address styling not present in Safari and Chrome.
   */

  dfn {
    font-style: italic;
  }

  /**
   * Address variable `h1` font-size and margin within `section` and `article`
   * contexts in Firefox 4+, Safari, and Chrome.
   */

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  /**
   * Address styling not present in IE 8/9.
   */

  mark {
    background: #ff0;
    color: #000;
  }

  /**
   * Address inconsistent and variable font size in all browsers.
   */

  small {
    font-size: 80%;
  }

  /**
   * Prevent `sub` and `sup` affecting `line-height` in all browsers.
   */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  /* Embedded content
     ========================================================================== */

  /**
   * Remove border when inside `a` element in IE 8/9/10.
   */

  img {
    border: 0;
  }

  /**
   * Correct overflow not hidden in IE 9/10/11.
   */

  svg:not(:root) {
    overflow: hidden;
  }

  /* Grouping content
     ========================================================================== */

  /**
   * Address margin not present in IE 8/9 and Safari.
   */

  figure {
    margin: 1em 40px;
  }

  /**
   * Address differences between Firefox and other browsers.
   */

  hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
  }

  /**
   * Contain overflow in all browsers.
   */

  pre {
    overflow: auto;
  }

  /**
   * Address odd `em`-unit font size rendering in all browsers.
   */

  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  /* Forms
     ========================================================================== */

  /**
   * Known limitation: by default, Chrome and Safari on OS X allow very limited
   * styling of `select`, unless a `border` property is set.
   */

  /**
   * 1. Correct color not being inherited.
   *    Known issue: affects color of disabled elements.
   * 2. Correct font properties not being inherited.
   * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.
   */

  button,
  input,
  optgroup,
  select,
  textarea {
    color: inherit; /* 1 */
    font: inherit; /* 2 */
    margin: 0; /* 3 */
  }

  /**
   * Address `overflow` set to `hidden` in IE 8/9/10/11.
   */

  button {
    overflow: visible;
  }

  /**
   * Address inconsistent `text-transform` inheritance for `button` and `select`.
   * All other form control elements do not inherit `text-transform` values.
   * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.
   * Correct `select` style inheritance in Firefox.
   */

  button,
  select {
    text-transform: none;
  }

  /**
   * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
   *    and `video` controls.
   * 2. Correct inability to style clickable `input` types in iOS.
   * 3. Improve usability and consistency of cursor style between image-type
   *    `input` and others.
   */

  button,
  html input[type="button"], /* 1 */
  input[type="reset"],
  input[type="submit"] {
    -webkit-appearance: button; /* 2 */
    cursor: pointer; /* 3 */
  }

  /**
   * Re-set default cursor for disabled elements.
   */

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  /**
   * Remove inner padding and border in Firefox 4+.
   */

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  /**
   * Address Firefox 4+ setting `line-height` on `input` using `!important` in
   * the UA stylesheet.
   */

  input {
    line-height: normal;
  }

  /**
   * It's recommended that you don't attempt to style these elements.
   * Firefox's implementation doesn't respect box-sizing, padding, or width.
   *
   * 1. Address box sizing set to `content-box` in IE 8/9/10.
   * 2. Remove excess padding in IE 8/9/10.
   */

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
   * Fix the cursor style for Chrome's increment/decrement buttons. For certain
   * `font-size` values of the `input`, it causes the cursor style of the
   * decrement button to change from `default` to `text`.
   */

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  /**
   * 1. Address `appearance` set to `searchfield` in Safari and Chrome.
   * 2. Address `box-sizing` set to `border-box` in Safari and Chrome
   *    (include `-moz` to future-proof).
   */

  input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
  }

  /**
   * Remove inner padding and search cancel button in Safari and Chrome on OS X.
   * Safari (but not Chrome) clips the cancel button when the search input has
   * padding (and `textfield` appearance).
   */

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
   * Define consistent border, margin, and padding.
   */

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  /**
   * 1. Correct `color` not being inherited in IE 8/9/10/11.
   * 2. Remove padding so people aren't caught out if they zero out fieldsets.
   */

  legend {
    border: 0; /* 1 */
    padding: 0; /* 2 */
  }

  /**
   * Remove default vertical scrollbar in IE 8/9/10/11.
   */

  textarea {
    overflow: auto;
  }

  /**
   * Don't inherit the `font-weight` (applied by a rule above).
   * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.
   */

  optgroup {
    font-weight: bold;
  }

  /* Tables
     ========================================================================== */

  /**
   * Remove most spacing between table cells.
   */

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }
  /*
  =========================================================================
  Add more personal normalize.
  =========================================================================
  */

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none !important;
  }

  p {
    padding: 0;
    margin: 0;
    word-wrap: normal;
    word-break: keep-all;
  }

  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  h2, h3, h4, h5 {
    word-wrap: normal;
    word-break: keep-all;
  }

  ::selection {
    /*color: #313131;
    background: rgba(245, 236, 133, 0.9);*/
    color: #efefef;
    background: rgba(0, 137, 145, 0.9);
  }

  /*
    Normalize ended
   ==========================================================================
   ==========================================================================
   ==========================================================================
   ==========================================================================
    Personal CSS Started
  */

  body {
    font: 1rem/1.1 'Avenir', Helvetica, Arial, "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-stroke: 0.15px rgba(0,0,0,0.3);
    /*overflow-x: hidden;*/
  } /* body normalize more */

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  #app {
    min-width: 320px;
  }

  .main {
    max-width: 1600px;
    margin: auto;
  }

  .nav_king {
    width: 100%;
    background: #f8f9fa;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.14);
  }

  .nav_wrap {
    max-width: 1600px;
    margin: auto;
  }

  .create_btn_text {
    font-size: 0.9em;
    line-height: 1.9em;
  }

  .search_group {
    text-align: right;
  }

  .search_option {
    display: inline-block;
    // width: 75px;
    width: calc(75px);
    height: 30px;
    text-align: center;
    font-size: 0.8em;
    line-height: 1em;
    outline: 0;
    border: 1px solid #c1c1c1;
    border-radius: 5px 0 0 5px;
    background-color: #ffffff;
    vertical-align: top;
    padding: 0 0 0 10px;
  }

  .search_text {
    display: inline-block;
    // width: 160px;
    width: calc(100% - 102px);
    height: 30px;
    font-size: 0.8em;
    line-height: 0.8em;
    vertical-align: top;
    border: 1px solid #c1c1c1;
    padding: 10px;
    margin-left: -6px;
  }

  .search_btn {
    display: inline-block;
    width: 30px;
    // width: 15%;
    height: 30px;
    padding: 0;
    text-align: center;
    border: 1px solid #c1c1c1;
    border-radius: 0 5px 5px 0;
    margin-left: -6px;

    img {
      width: 55%;
      height: 60%;
    }
  }
  /* Search box ended */


  /* Pagination */
  .pagination {
    display: block;
    text-align: center;
    margin: 0 auto;
    font-size: 0;
    padding: 10px 0;
  }

  .page-item {
    font-size: 14px;
    border-radius: 0;
  }

  .page-link {
    display: inline-block;
    border-radius: 0 !important;
    padding: 0 !important;

    a {
      display: block;
      width: 35px;
      height: 35px;
      text-align: center;
      line-height: 35px;
    }
  }

  .page-link.active {
    background-color: #007bcc;

    a {
      color: #efefef;
    }
  }

  .page-link.disabled {
    a {
      color: #c1c1c1;
    }
  }

  .page-link.prev, .page-link.next {
    border: none;
  }

  /*Pagination End*/

  // Board lists = Edit list contents a bit
  .board_container {
    width: 100%;
    padding: 10px 0;
  }

  .board_wrap {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    border-top: 2px solid #eaeaea;
    border-bottom: 2px solid #eaeaea;
    padding: 10px 15px 0 15px;
    transition: all 200ms ease-in-out;
  }

  .board_header {
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 10px;
  }

  .board_ul {

  }

  .board_li {
    padding: 5px 0;
    border-bottom: 1px solid #eaeaea;
  }

  .board_li:last-child {
    border: none;
  }

  .board_centre {
    text-align: center;
  }


  // Make list contents looks good in w-320px too
  .list_header {
    word-break: break-all;
  }

  .list_body {
    li {
      word-break: break-all;
      div {
        word-break: break-all;
      }
    }
  }


  // Navigation
  .text_navigation {
    display: inline-block;
    margin: 1% 0 3% 15px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    padding: 8px;
  }

  .text_navigation span {
    font-size: 14px;
    color: #818181;
  }

  .text_navigation a {
    font-size: 14px;
    color: #007aff;
  }


  // About transition name=fade
  .fade-enter-active {
    transition: all 200ms ease-out;
  }

  .fade-leave-active {
    transition: none;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    // transform: translateY(10px);
    position: absolute;
    width: 100%;
    margin: auto;
  }

  .error_label {
    font-family: 'Nanums_regular', sans-serif;
    font-size: 14px;
    display: inline-block;
    padding: 1px 5px;
    color: #ee5151;
    border-radius: 5px;
    margin: 5px 0;
    border: 1px solid #ee5151;
    box-sizing: border-box;
  }

  /* Tooltip */
  .question {
    vertical-align: text-top !important;
  }

  .tooltip {
    display: block !important;
    z-index: 10000;

    .tooltip-inner {
      background: #17959d;
      color: #fefefe;
      border-radius: 16px;
      padding: 5px 10px 4px;
      max-width: 210px !important;
      word-break: keep-all;
    }

    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      border-color: #17959d;
      z-index: 1;
    }

    &[x-placement^="top"] {
      margin-bottom: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="bottom"] {
      margin-top: 5px;

      .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="right"] {
      margin-left: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -4px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[x-placement^="left"] {
      margin-right: 5px;

      .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition: opacity .15s, visibility .15s;
    }

    &[aria-hidden='false'] {
      visibility: visible;
      opacity: 0.9;
      transition: opacity .15s;
    }
  }


  // Drag element
  .drag_thing_drag {
    transition: opacity 200ms ease-in-out;
    opacity: 0.7;
    z-index: 9980 !important;
  }

  .drag_handle {
    position: absolute !important;
    background-color: #ffffff;
    border: 1px solid #000000 !important;
    border-radius: 50%;
    height: 14px !important;
    width: 14px !important;
    z-index: 9999 !important;
    // box-model: border-box;
    transition: all 300ms linear;
  }
  .drag_handle-tl {
    top: -14px;
    left: -14px;
    cursor: nw-resize;
  }

  .drag_handle-tm {
    top: -14px;
    left: 50%;
    margin-left: -7px;
    cursor: n-resize;
  }

  .drag_handle-tr {
    top: -14px;
    right: -14px;
    cursor: ne-resize;
  }

  .drag_handle-ml {
    top: 50%;
    margin-top: -7px;
    left: -14px;
    cursor: w-resize;
  }

  .drag_handle-mr {
    top: 50%;
    margin-top: -7px;
    right: -14px;
    cursor: e-resize;
  }

  .drag_handle-bl {
    bottom: -14px;
    left: -14px;
    cursor: sw-resize;
  }

  .drag_handle-bm {
    bottom: -14px;
    left: 50%;
    margin-left: -7px;
    cursor: s-resize;
  }

  .drag_handle-br {
    bottom: -14px;
    right: -14px;
    cursor: se-resize;
  }

  .drag_handle-tl:hover,
  .drag_handle-tr:hover,
  .drag_handle-bl:hover,
  .drag_handle-br:hover {
    background-color: red;
    transform: scale(1.4);
  }

</style>
