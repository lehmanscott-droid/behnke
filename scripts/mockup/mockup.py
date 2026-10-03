"""Hang a painting on the shared warehouse wall for the site's artwork photos.

Every painting on the site is shown on the same board-formed concrete wall
(warehouse-wall.jpg, generated with Higgsfield for this site) at its true
size, so pieces compare honestly against each other. The art itself is
pasted in untouched; only the wall's spotlight falloff and a shadow are added.

    pip install pillow numpy
    python scripts/mockup/mockup.py <id> <flat-painting.jpg> <width_in> <height_in>

`flat-painting.jpg` is the painting alone, straightened and cropped to its
edges (or to the outside of its frame if it sells framed). Writes
public/artwork/<id>.jpg (2600 px, zoom lens) and <id>-web.jpg (1400 px).
Make <id>-canvas.jpg (the painting alone, long side 1024 px) separately.
"""
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'public', 'artwork')

S = 2  # work at 4096 px so the zoom lens has detail
PPI = 28 * S  # wall pixels per inch
CX, CY = 1024 * S, 760 * S  # centre of the spotlight


def mockup(pid, src, w_in, h_in):
    room = Image.open(os.path.join(HERE, 'warehouse-wall.jpg')).convert('RGB')
    room = room.resize((2048 * S,) * 2, Image.LANCZOS)
    lum = np.asarray(room.convert('L').filter(ImageFilter.GaussianBlur(80))).astype(float)

    w, h = round(w_in * PPI), round(h_in * PPI)
    art = Image.open(src).convert('RGB').resize((w, h), Image.LANCZOS)
    x0, y0 = round(CX - w / 2), round(CY - h / 2)

    # soft drop shadow from the overhead light + a tight contact shadow
    mask = Image.new('L', (w, h), 255)
    soft = Image.new('L', room.size, 0)
    soft.paste(mask, (x0 + int(0.15 * PPI), y0 + int(0.9 * PPI)))
    soft = soft.filter(ImageFilter.GaussianBlur(1.0 * PPI))
    tight = Image.new('L', room.size, 0)
    tight.paste(mask, (x0 + 2, y0 + int(0.12 * PPI)))
    tight = tight.filter(ImageFilter.GaussianBlur(0.12 * PPI))
    o = np.asarray(room).astype(float)
    a = np.asarray(soft) / 255 * 0.55 + np.asarray(tight) / 255 * 0.45
    o *= 1 - a.clip(0, 0.8)[..., None]

    # light the painting with the same spotlight falloff as the wall
    reg = lum[y0:y0 + h, x0:x0 + w]
    k = (reg / np.percentile(reg, 95)).clip(0.2, 1.05) ** 0.45
    p = np.asarray(art).astype(float) * k[..., None] * np.array([1.0, 0.97, 0.9])
    e = max(2, int(0.06 * PPI))  # darker bottom/right edge reads as depth
    p[-e:] *= 0.55
    p[:, -e:] *= 0.7
    o[y0:y0 + h, x0:x0 + w] = p

    img = Image.fromarray(o.clip(0, 255).astype(np.uint8))
    opts = dict(optimize=True, progressive=True)
    img.resize((2600, 2600), Image.LANCZOS).save(os.path.join(OUT, f'{pid}.jpg'), quality=84, **opts)
    img.resize((1400, 1400), Image.LANCZOS).save(os.path.join(OUT, f'{pid}-web.jpg'), quality=80, **opts)


if __name__ == '__main__':
    pid, src, w_in, h_in = sys.argv[1:5]
    mockup(pid, src, float(w_in), float(h_in))
