import { CsLogDto } from './dto/CsLogDto';
import { CsLog } from './entities/CsLog';
import { FileFormatException } from '../file/FileFormatException';

export class CsLogConverter {
  static FilesToCsLogs(files: File[]): Promise<CsLog[]> {
    const promises: Promise<CsLog[]>[] = files.map((file) =>
      file
        .text()
        .then((str) => {
          const result: CsLog[] = [];
          const lines = str.split('\n');

          for (let i = 0; i < lines.length - 1; i++) {
            const x: CsLogDto = JSON.parse(lines[i]);

            result.push({
              id: crypto.randomUUID(),
              data: {
                ...x,
                '@t': new Date(x['@t'])
              }
            });
          }

          return result;
        })
        .catch((e) => {
          if (e instanceof SyntaxError) {
            throw new FileFormatException('Invalid format. File must have CLEF format. See https://clef-json.org/');
          }

          throw e;
        })
    );

    return Promise.all(promises).then((x) => x.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));
  }
}
