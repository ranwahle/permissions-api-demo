

function report({x, y, z}) {
    document.querySelector('#statusDiv').textContent = JSON.stringify(
        {
            x: Math.round(x), y: Math.round(y), z: Math.round(z)
        }
    )
}

document.addEventListener('DOMContentLoaded', async () => {
    const status = await navigator.permissions.request({name: 'accelerometer'});

    if (status.state === 'granted') {
           let accelerometer =  new Accelerometer({frequency: 20});

          document.querySelector('#statusDiv').textContent = 'Accelerometer is defined';

        accelerometer.addEventListener('reading', e => {
            console.log('e', e);
            report( accelerometer);

        });
        accelerometer.start();
        document.querySelector('#statusDiv').textContent = 'Accelerometerhas started';


        document.querySelector('#btnStopAccelerometer').onclick = () => {
            navigator.permissions.revoke({name: 'accelerometer'}).then(res => {
                if (res.state !== 'granted') {
                    document.querySelector('#permissionStateDiv').textContent = 'Accelerometerhas stooped';

                } else {
                    document.querySelector('#permissionStateDiv').textContent = res.state;

                }
            })
        }
    }


})
