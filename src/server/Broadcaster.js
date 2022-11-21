const EventEmitter = require('events').EventEmitter;
const csvParse = require('csv-parse');
const fs = require('fs');
const Writable = require('stream').Writable;
const Speedlimit = require('./Speedlimit');

class Broadcaster extends EventEmitter {
  speedlimit;

  constructor() {
    super();

    this.speedlimit = new Speedlimit();
  }

  start() {
    this.broadcasting = true;
    const broadcast = () => {
      console.log('Broadcasting...');
      const fileStream = fs.createReadStream('./meta/route.csv');

      fileStream
        // Filestream piped to csvParse which accept nodejs readablestreams and parses each line to a JSON object
        .pipe(csvParse({ delimiter: ',', columns: true, cast: true }))
        // Then it is piped to a writable streams that will push it into nats
        .pipe(
          new Writable({
            objectMode: true,
            write: (obj, enc, cb) => {
              if (!this.broadcasting) return cb();

              // setTimeout in this case is there to emulate real life situation
              // data that came out of the vehicle came in with irregular interval
              // Hence the Math.random() on the second parameter
              setTimeout(async () => {
                const currentSpeedlimit =
                  this.speedlimit.getCurrentSpeedlimit();
                const objWithSpeedlimit = {
                  ...obj,
                  speedlimit: currentSpeedlimit,
                };

                this.emit('data', objWithSpeedlimit);
                cb();
              }, Math.ceil(Math.random() * 150));
            },
          })
        )
        .once('finish', () => {
          console.log('Finished broadcasting');
          if (this.broadcasting) {
            console.log('Re-broadcast');
            broadcast();
          } else {
            console.log('Stopped broadcast');
            return;
          }
        });
    };
    broadcast();
  }

  end() {
    this.broadcasting = false;
  }
}

module.exports = Broadcaster;
