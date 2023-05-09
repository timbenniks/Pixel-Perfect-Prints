export function generateSrcSet(widths: number[], imageId: string) {
  let srcset = "";

  widths.forEach((width) => {
    const url = concatCloudinaryUrl(imageId, width);
    srcset += `${url} ${width}w, `;
  });

  return srcset.slice(0, -2);
}

export function concatCloudinaryUrl(imageId: string, width: number) {
  return `https://res.cloudinary.com/dwfcofnrd/image/upload/f_auto,q_auto,w_${width}/${imageId}`;
}