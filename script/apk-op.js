/* =====================================================================
   apk-op.js  ·  botão "Baixar app para Android" no site (celular): login, escolha de modo e painel Social
   O arquivo vem da Release "apk-atual" do próprio repositório, que o
   fluxo "Gerar APK" atualiza. O endereço é descoberto sozinho quando o
   site está no GitHub Pages (usuario.github.io/repositorio). Para outro
   endereço, defina antes deste script:  window.APK_URL_OP = "https://..."
   ===================================================================== */
(function () {
  "use strict";

  function urlDoApk() {
    if (window.APK_URL_OP) return window.APK_URL_OP;
    var m = /^([^.]+)\.github\.io$/i.exec(location.hostname);
    var repo = location.pathname.split("/").filter(Boolean)[0];
    if (!m || !repo) return "";
    return "https://github.com/" + m[1] + "/" + repo + "/releases/download/apk-atual/OrdemIgnea.apk";
  }

  function dentroDoApp() {
    try {
      if (window.Capacitor && typeof window.Capacitor.getPlatform === "function" && window.Capacitor.getPlatform() !== "web") return true;
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
      // WebView do Android (o app abrindo o site publicado): o User-Agent traz "; wv)"
      if (/;\s*wv\)/.test(navigator.userAgent || "")) return true;
    } catch (_) {}
    return false;
  }

  function ehAndroid() {
    return /Android/i.test(navigator.userAgent || "");
  }

  function criarBotao(classe) {
    var a = document.createElement("a");
    a.className = "apk-baixar " + (classe || "");
    a.href = urlDoApk();
    a.setAttribute("download", "OrdemIgnea.apk");
    a.rel = "noopener";
    a.innerHTML = '<i class="ti ti-download" aria-hidden="true"></i><span>Baixar app para Android</span>';
    return a;
  }

  function dica() {
    var p = document.createElement("p");
    p.className = "apk-dica";
    p.textContent = "Se o Android avisar, permita instalar de fonte desconhecida só para este download.";
    return p;
  }

  function iniciar() {
    if (dentroDoApp() || !ehAndroid() || !urlDoApk()) return;

    var botoes = document.querySelector("#loginBox .lg-botoes");
    if (botoes && !botoes.querySelector(".apk-baixar")) {
      botoes.appendChild(criarBotao("apk-login"));
      botoes.appendChild(dica());
    }

    var social = document.getElementById("painelAmigos");
    if (social && !social.querySelector(".apk-baixar")) {
      var rod = document.createElement("div");
      rod.className = "apk-social";
      rod.appendChild(criarBotao("apk-social-btn"));
      social.appendChild(rod);
    }

    var modo = document.querySelector("#tela-modo .tm-wrap");
    if (modo && !modo.querySelector(".apk-baixar")) {
      var caixa = document.createElement("div");
      caixa.className = "apk-modo";
      caixa.appendChild(criarBotao("apk-modo-btn"));
      modo.appendChild(caixa);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
