const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   
const niceBytes = (x) => {
  let l = 0, n = parseInt(x, 10) || 0;
  while(n >= 1024 && ++l){
      n = n/1024;
  }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}
export default niceBytes;

export const scrollToId = (page, _block="center") => {
  const x = document.querySelector("#" + page);
  setTimeout(()=>{
      x.scrollIntoView({block: _block, behavior: 'smooth'});
  }, 50);
}

export const chunkArray = (a, n, balanced) => {
  if (n < 2)
        return [a];
    let len = a.length,
            out = [],
            i = 0,
            size;
    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }
    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }
    else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));
    }
    return out;
}

export const getStatusString = (n) =>
{
    switch(n) {
        case 0: return "Nowe";
        case 1: return "Przyjęto";
        case 2: return "Realizowane";
        case 3: return "Wysłano";
        case 4: return "Zakończono";
        default: return "unknown";
    }

}