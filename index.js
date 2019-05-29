const geoSettings = {
    enableHighAccuracy: false,
    maximumAge        : 30000,
    timeout           : 20000
};

const revealPosition = () => {};

const positionDenied = () => {};

document.addEventListener('DOMContentLoaded', async () => {

    const permissionStates = {};

    function handleStatus(status) {
        const permissionName = document.querySelector('#txtPermissionName').value;
        permissionStates[permissionName] =  permissionStates[permissionName] || status;
        if (!permissionStates[permissionName].onchange) {
            permissionStates[permissionName].onchange = event => {
                console.log('permission changed', event.target)
            }
        }
        document.querySelector('#status').textContent = JSON.stringify(
           Object.keys(permissionStates).map(key => ({name: key, state: permissionStates[key].state}) ));
    }

    document.querySelector('#btnRequestPermission').onclick = () => {
        const permissionName = document.querySelector('#txtPermissionName').value;
        navigator.permissions.request({name: permissionName}).then(handleStatus)
    }

    document.querySelector('#btnQueryPermission').onclick = () => {
        const permissionName = document.querySelector('#txtPermissionName').value;
        navigator.permissions.query({name: permissionName}).then(handleStatus);
    }

    document.querySelector('#btnRevokePermission').onclick = () => {
        const permissionName = document.querySelector('#txtPermissionName').value;
        navigator.permissions.revoke({name: permissionName}).then(handleStatus);
    }
})
