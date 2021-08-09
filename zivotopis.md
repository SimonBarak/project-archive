---
layout: default
title: Životopis
---

<div class="pb-24">
<img loading="lazy" />
{%- for member in site.data.studio.members -%}

  <section class="py-10">
    <div class="max-w-lg mx-auto px-4 text-block">
    <div>
        <img loading="lazy"
          srcset="
    {{ site.img_url }}w_300{{ member.portret }} 500w,
    {{ site.img_url }}w_500{{ member.portret }} 710w,
    {{ site.img_url }}w_700{{ member.portret }} 1000w,
    {{ site.img_url }}w_700{{ member.portret }} 1420w"
          src="{{ site.img_url }}w_500{{ member.portret }}"
          sizes="100vw"
          alt="{{ member.name }}, zakladatel studia mp arch"
          class="h-40 mb-4 object-contain"
        />
      </div> 
      <h1 class="mb-4 text-2xl">{{ member.name }}</h1>
      
      <p class="text-lg pb-10 text-gray-600">{{ member.resume }}</p>
    </div>
  </section>
{%- endfor -%}
</div>
