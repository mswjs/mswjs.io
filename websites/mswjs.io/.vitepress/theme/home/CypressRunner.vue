<template>
  <div class="border border-neutral-700 rounded-lg overflow-hidden ml-auto">
    <ul class="p-4 border-l-4 border-green-600">
      <li>
        <p class="text-lg font-bold">Product detail page</p>
        <ul class="md:pl-4 py-2 text-neutral-400">
          <li>
            <p>
              <span class="mr-[1ch] text-green-600 font-mono">✔</span><span class="font-medium">Displays product item details</span>
            </p>
            <ul class="ml-1 px-4 py-2 border-l border-neutral-800">
              <li>
                <p class="mb-1 uppercase font-medium text-neutral-600 text-sm">Test body</p>
                <table
                  class="bg-neutral-800 bg-opacity-50 font-mono font-medium text-sm w-full"
                  cellpadding="5"
                >
                  <tbody>
                  <tr class="border-b border-neutral-800">
                    <td class="w-[3ch] text-center opacity-50">1</td>
                    <td class="uppercase font-bold">Visit</td>
                    <td>/product/abc-123</td>
                  </tr>
                  <tr class="border-b border-neutral-800">
                    <td class="w-[3ch] text-center" />
                    <td class="uppercase text-neutral-600 italic">(XHR)</td>
                    <td class="inline-flex items-center gap-2">
                      <span class="inline-block w-2 h-2 bg-green-600 rounded-full" /> GET 200 api.acme/product/abc-123</td>
                  </tr>
                  <tr class="border-b border-neutral-800 align-top">
                    <td class="w-[3ch] text-center opacity-50">2</td>
                    <td class="uppercase font-bold">
                      <span class="bg-green-600 text-black rounded-sm px-1">Assert</span>
                    </td>
                    <td class="text-green-600">expected <span class="text-green-300">h1.title</span> to have value <span class="text-green-300">Porcelain Mug</span></td>
                  </tr>
                  <tr class="align-top">
                    <td class="w-[3ch] text-center opacity-50">3</td>
                    <td class="uppercase font-bold">
                      <span class="bg-green-600 text-black rounded-sm px-1">Assert</span>
                    </td>
                    <td class="text-green-600">expected <span class="text-green-300">p.price</span> to have value <span class="text-green-300">$9.99</span></td>
                  </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
