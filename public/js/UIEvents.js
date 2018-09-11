/* eslint-env browser,jquery */

function fetchData(url, onSucceed) {
  fetch(url)
    .then(response => response.json())
    .then(response => onSucceed(JSON.stringify(response)));
}

$('body').on('click', '#searchButtonId', () => {
  const characterName = $('#characterNameId').val();

  fetchData(`./api/getCharacter/${characterName}`,
    (data) => {
      console.log(data);
    });
});
