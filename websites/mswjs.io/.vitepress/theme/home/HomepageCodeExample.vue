<!-- This website uses a rehype plugin to implement code
syntax highlighting in MDX files. It cannot be used in
Vue directly, so here we are. -->
<!-- NOTE: whitespace inside <pre> is significant in Vue templates.
Tags are deliberately packed together (line breaks only inside tags)
to keep the rendered output identical to the React original. -->
<template>
  <pre
    style="background-color:#24292e"
    tabindex="0"
    data-language="js"
    data-theme="default"
  ><code data-language="js" data-theme="default" style="display:grid"
    ><span data-line=""
      ><span style="color:var(--site-code-keyword)">import</span
      ><span style="color:var(--site-code-text)"> { http, HttpResponse } </span
      ><span style="color:var(--site-code-keyword)">from</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-string)">'msw'</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-keyword)">import</span
      ><span style="color:var(--site-code-text)"> { setupWorker } </span
      ><span style="color:var(--site-code-keyword)">from</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-string)">'msw/browser'</span
    ></span
    ><span data-line=""> </span
    ><span data-line=""
      ><span style="color:var(--site-code-comment)">// Describe the network.</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-keyword)">const</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-constant)">handlers</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-keyword)">=</span
      ><span style="color:var(--site-code-text)"> [</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">  http.</span
      ><span style="color:var(--site-code-function)">get</span
      ><span style="color:var(--site-code-text)">(</span
      ><span style="color:var(--site-code-string)">'https://acme.com/product/:id'</span
      ><span style="color:var(--site-code-text)">, ({ </span
      ><span style="color:var(--site-code-parameter)">params</span
      ><span style="color:var(--site-code-text)"> }) </span
      ><span style="color:var(--site-code-keyword)">=&gt;</span
      ><span style="color:var(--site-code-text)"> {</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">  </span
      ><span style="color:var(--site-code-keyword)">  return</span
      ><span style="color:var(--site-code-text)"> HttpResponse.</span
      ><span style="color:var(--site-code-function)">json</span
      ><span style="color:var(--site-code-text)">({</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">      id: params.id,</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">      title: </span
      ><span style="color:var(--site-code-string)">'Porcelain Mug'</span
      ><span style="color:var(--site-code-text)">,</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">      price: </span
      ><span style="color:var(--site-code-constant)">9.99</span
      ><span style="color:var(--site-code-text)">,</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">    })</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">  }),</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-text)">]</span
    ></span
    ><span data-line=""> </span
    ><span data-line=""
      ><span style="color:var(--site-code-comment)">// Enable API mocking anywhere.</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-keyword)">const</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-constant)">worker</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-keyword)">=</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-function)">setupWorker</span
      ><span style="color:var(--site-code-text)">(</span
      ><span style="color:var(--site-code-keyword)">...</span
      ><span style="color:var(--site-code-text)">handlers)</span
    ></span
    ><span data-line=""
      ><span style="color:var(--site-code-keyword)">await</span
      ><span style="color:var(--site-code-text)"> </span
      ><span style="color:var(--site-code-text)">worker.</span
      ><span style="color:var(--site-code-function)">start</span
      ><span style="color:var(--site-code-text)">()</span
    ></span
  ></code></pre>
</template>
