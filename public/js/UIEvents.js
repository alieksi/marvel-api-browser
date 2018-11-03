/* eslint-env browser,jquery */

let searchResults = [];

function blockUI(selector) {
  $.blockUI({
    selector,
    message: '<div style="background-color: transparent !important;" class="ui active inverted dimmer"><div class="ui huge loader"></div></div>',
    css:
    {
      border: 'none', width: '0%', left: '50%', backgroundColor: '#fff',
    },
  });
}

function unblockUI(selector) {
  $.unblockUI(selector);
}

function ModalWarning(message) {
  $('#modalMessage').empty();
  $('#modalMessage').append(message);

  $('.ui.basic.modal').modal({
    closable: true,
  }).modal('show');
}

function fetchData(url, onSucceed) {
  blockUI('#mainContainerId');

  fetch(url)
    .then(response => response.json())
    .catch((error) => {
      ModalWarning(error.message);
    })
    .then((response) => {
      onSucceed(JSON.stringify(response));
    })
    .finally(() => {
      unblockUI('#mainContainerId');
    });
}

function appendSearchResult(selector, data) {
  if (data.length === 0) {
    const characterName = $('#characterNameId').val();
    ModalWarning(`No result found for ${characterName}`);
  } else {
    $(selector).empty();

    let searchHTMLData = '<div class="ui link cards centered">';
    data.forEach((element, i) => {
      searchHTMLData = searchHTMLData.concat(`<div characterindex="${i}" class="card">`
        + `<div class="image"><img src="${element.thumbnail}"></div>`
        + '<div class="content">'
        + `<div class="header">${element.name}</div>`
        + `<div class="description">${element.description}</div>`
        + '</div>'
        + '</div>');
    });
    searchHTMLData.concat('</div>');

    $(selector).append(searchHTMLData);
  }
}

$('body').on('click', '#searchButtonId', () => {
  const characterName = $('#characterNameId').val();

  if (characterName === '') {
    ModalWarning('Enter a character name!');
  } else {
    fetchData(`./api/getCharacter/${characterName}`,
      (data) => {
        const parsedData = JSON.parse(data);
        searchResults = parsedData.slice();

        appendSearchResult('#searchResultId', parsedData);
      });
  }
});

$('body').on('click', '.card', function cardClickEvent() {
  const characterIndex = $(this).attr('characterindex');

  if (characterIndex !== undefined && characterIndex !== '') {
    // Clear character modal information
    $('#characterModal > .content > .ui.small.image').empty();
    $('#characterModal > .content > .description > .ui.header').empty();
    $('#characterModal > .content > .description > .ui.list').empty();

    // Get selected character
    const selectedCharacter = searchResults[characterIndex];

    let urls = '';
    selectedCharacter.urls.forEach((url) => {
      urls = urls.concat(`<a class='item' target='_blank' href='${url.url}'>${url.type}</a>`);
    });

    // Append information
    $('#characterModal > .content > .ui.small.image').append(`<image src='${selectedCharacter.thumbnail}' >`);
    $('#characterModal > .content > .description > .ui.header').append(`${selectedCharacter.name}`);
    $('#characterModal > .content > .description > .ui.list').append(`${urls}`);

    $('#characterModal').modal('show');
  }
});
