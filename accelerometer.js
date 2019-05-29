

function report({x, y, z}) {
    // document.querySelector('#statusDiv').textContent = JSON.stringify(
    //     {
    //         x: Math.round(x), y: Math.round(y), z: Math.round(z)
    //     }
    // )
    try {
        // document.querySelector('#imageDiv img').setAttribute('style', `transform : rotate( ${x * 36}deg)`);
        document.querySelector('#imageDiv img').style.transform = `rotate( ${x * -9}deg)`;
    } catch (e) {
        document.querySelector('#statusDiv').textContent = e;
    }

}

document.addEventListener('DOMContentLoaded', async () => {
   // const status = await navigator.permissions.request({name: 'accelerometer'});

    //if (status.state === 'granted') {
           let accelerometer =  new Accelerometer({frequency: 20});

          document.querySelector('#statusDiv').textContent = 'Accelerometer is defined';

        accelerometer.addEventListener('reading', e => {
            console.log('e', e);
            report( accelerometer);

        });
        accelerometer.start();
        document.querySelector('#statusDiv').textContent = 'Accelerometerhas started';
        report({x: 1})


        document.querySelector('#btnStopAccelerometer').onclick = () => {
            navigator.permissions.revoke({name: 'accelerometer'}).then(res => {
                if (res.state !== 'granted') {
                    document.querySelector('#permissionStateDiv').textContent = 'Accelerometerhas stooped';

                } else {
                    document.querySelector('#permissionStateDiv').textContent = res.state;

                }
            })
        }
    //}


})
