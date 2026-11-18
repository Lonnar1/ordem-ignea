"""Prepara o projeto Android criado pelo Capacitor:
ícone do app, tela de abertura escura e permissões de câmera/arquivos.
Roda dentro do GitHub Actions, depois de `npx cap add android`."""
import os
import re
from PIL import Image, ImageDraw

RES = "android/app/src/main/res"
MANIFEST = "android/app/src/main/AndroidManifest.xml"
FUNDO = (22, 16, 26)  # #16101a


def abrir(nome):
    return Image.open(os.path.join("www", "img", nome)).convert("RGBA")


icone = abrir("icon-512.png")            # ícone com cantos arredondados
cheio = abrir("icon-maskable-512.png")   # quadrado, sem transparência

# 1) ícone: tamanhos legados (px) e do ícone adaptativo (108dp)
tamanhos = {"mdpi": (48, 108), "hdpi": (72, 162), "xhdpi": (96, 216), "xxhdpi": (144, 324), "xxxhdpi": (192, 432)}
for dens, (leg, fg) in tamanhos.items():
    pasta = os.path.join(RES, "mipmap-" + dens)
    if not os.path.isdir(pasta):
        continue
    icone.resize((leg, leg), Image.LANCZOS).save(os.path.join(pasta, "ic_launcher.png"))
    # versão redonda
    base = cheio.resize((leg, leg), Image.LANCZOS)
    mascara = Image.new("L", (leg, leg), 0)
    ImageDraw.Draw(mascara).ellipse((0, 0, leg - 1, leg - 1), fill=255)
    redondo = Image.new("RGBA", (leg, leg), (0, 0, 0, 0))
    redondo.paste(base, (0, 0), mascara)
    redondo.save(os.path.join(pasta, "ic_launcher_round.png"))
    cheio.resize((fg, fg), Image.LANCZOS).save(os.path.join(pasta, "ic_launcher_foreground.png"))

# cor de fundo do ícone adaptativo
fundo_xml = os.path.join(RES, "values", "ic_launcher_background.xml")
with open(fundo_xml, "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#16101A</color>\n</resources>\n')

# 2) tela de abertura: fundo escuro com o selo no centro (troca o logo do Capacitor)
selo = icone.resize((160, 160), Image.LANCZOS)
for raiz, _, arquivos in os.walk(RES):
    for nome in arquivos:
        if nome == "splash.png":
            caminho = os.path.join(raiz, nome)
            w, h = Image.open(caminho).size
            tela = Image.new("RGBA", (w, h), FUNDO + (255,))
            lado = max(96, min(w, h) // 3)
            s = icone.resize((lado, lado), Image.LANCZOS)
            tela.paste(s, ((w - lado) // 2, (h - lado) // 2), s)
            tela.convert("RGB").save(caminho)

# 3) permissões: câmera e leitura de fotos (para anexar documentos)
with open(MANIFEST, encoding="utf-8") as f:
    xml = f.read()
extras = [
    '<uses-permission android:name="android.permission.CAMERA" />',
    '<uses-feature android:name="android.hardware.camera" android:required="false" />',
]
for linha in extras:
    if linha not in xml:
        xml = xml.replace("</manifest>", "    " + linha + "\n</manifest>")
with open(MANIFEST, "w", encoding="utf-8") as f:
    f.write(xml)

print("Android preparado: ícones, abertura e permissões.")
