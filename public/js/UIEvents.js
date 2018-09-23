/* eslint-env browser,jquery */

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
      unblockUI('#mainContainerId');
      ModalWarning(error.message);
    })
    .then((response) => {
      onSucceed(JSON.stringify(response));
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
    data.forEach((element) => {
      searchHTMLData = searchHTMLData.concat(`<div resourceuri="${element.resourceURI}" class="card">`
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
        appendSearchResult('#searchResultId', JSON.parse(data));
      });
  }
});

$('body').on('click', '.card', function cardClickEvent() {
  const resourceURI = $(this).attr('resourceuri');

  if (resourceURI !== undefined && resourceURI !== '') {
    window.open(resourceURI, '_blank');
  }
});
