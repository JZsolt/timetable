const { default: axios } = require("axios");

const fetchData = (lang) => {
  axios
    .get(
      `http://localhost:1337/api/texts?fields=key%2Cvalue&locale=${
        lang.split("-")[0]
      }`
    )
    .then(({ data }) => {
      const langs = {
        locale: lang,
        translations: {},
      };
      data.data.forEach((item) => {
        langs.translations[item.attributes.key] = item.attributes.value;
      });
      require("fs").writeFileSync(
        `../locale/messages${lang === "en-US" ? "" : "." + lang}.json`,
        JSON.stringify(langs)
      );
    });
};

const fetchLangs = () => {
  const langs = ["hu", "en-US"];
  langs.forEach((lang) => {
    fetchData(lang);
  });
};

fetchLangs();
