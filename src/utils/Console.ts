

class VConsole{
  logTable = <T>(data: T[]) => {
    data.forEach(item => {
      console.log('|------------------|');
      console.log(item);
      console.log('|------------------|');
    });
  };
}

export  default new VConsole()
