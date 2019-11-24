// This is the "Offline page" service worker
// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log(
      "[PWA Builder] active service worker found, no need to register"
    );
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("sw.js,", {
        scope: "/public/"
      })
      .then(function(reg) {
        console.log(
          "[PWA Builder] Service worker has been registered for scope: " +
            reg.scope
        );
      });
  }
}

async function verificarLogado() {
  const requisicao = await fetch("/usuarios/1", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  });

  // ["", "public", "pages", "login.html"]
  path = location.pathname.split("/");

  if (path[1] === "login.html" || path[1] === "registro.html") {
    if (requisicao.status === 200) return (location = "/criar-carona.html");
    return;
  }

  if (requisicao.status !== 200) {
    return (location = "/login.html");
  }
}

verificarLogado();

async function realizarLogin(email, senha) {
  const dados = {
    email: email,
    senha: senha
  };

  const requisicao = await fetch("/sessoes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  return requisicao.json();
}

function definirValor(input, valor) {
  $(input)
    .val(valor)
    // Pega div geral do input
    .closest(".mdc-text-field")
    // Busca a div o outlined
    .find(".mdc-notched-outline")
    .addClass("mdc-notched-outline--notched")
    // Sobe o texto placeholder do input
    .find(".mdc-floating-label")
    .addClass("mdc-floating-label--float-above");
}

$(document).ready(() => {
  // Preenche os dados do menu lateral
  const dados = JSON.parse(localStorage.dadosUsuario);

  $("#nomeUsuario").text(dados.nome);
  $("#emailUsuario").text(dados.email);
});

// Seleciona o botão de login
$("span:contains('Logout')")
  .parent()
  .click(() => {
    localStorage.clear();

    location = "/login.html";
  });
