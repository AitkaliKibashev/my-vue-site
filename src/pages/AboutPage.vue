<template>
  <section class="about-me">
    <div class="container">
      <h1 class="section-title">Обо мне</h1>
      <p>
        Я начинающий Frontend разработчик. Немного изучил backend для себя, хотя думаю это должно быть частью обучение Фронту. В целом мне интересно все, что
        связано с технологиями. Уже год как в вебе, начал изучать фронт пол года назад, до этого занимался фрилансом в качестве Веб-Мастера.
      </p>
      <p>
        Я большой любитель практики.
      </p>
      <p>
        Долго думал насчет полезного пет-проекта в итоге пришел к созданию личного сайта, чтобы структировать информацию о себе и делиться своими мыслями. Вот что из этого вышло.
        <br>
        <br>
        P.S. А это vue версия сайта
      </p>
      <h2>Что я знаю, умею</h2>
      <ul>
        <li>- HTML, CSS(SASS), JS</li>
        <li>- React, Redux(RTK, Saga), TypeScript</li>
        <li>- Vue 3, Vuex, Composition API</li>
        <li>- Python, Django, DRF</li>
        <li>- KISS, DRY, SOLID</li>
        <li>- ООП, ФП</li>
        <li>- SSR, Rest API, WebSocket</li>
      </ul>
      <h2>Мое резюме</h2>
      <a href="/CV.pdf">Вот тут, тык</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped lang="scss">
.about-me {
  .section-title {
    margin-bottom: 10px;
  }

  p, a {
    max-width: 650px;

    padding: 20px 0;

    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.03em;
  }

  a {
    color: inherit;

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    padding: 20px 0;

    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.02em;
  }

  ul li {
    padding: 5px 0;
    list-style: none;
  }
}
</style>
