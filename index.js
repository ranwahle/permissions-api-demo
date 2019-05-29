

document.addEventListener('DOMContentLoaded', async () => {

    const permissionStates = {};
    function handleError(error) {
        const permissionName = document.querySelector('#txtPermissionName').value;
        permissionStates[permissionName] =  error;

        document.querySelector('#status').textContent = JSON.stringify(
            Object.keys(permissionStates).map(key => ({name: key, state: permissionStates[key].state
                    ||permissionStates[key].message }) ));



    }

    function handleStatus(status) {
        const permissionName = document.querySelector('#txtPermissionName').value;
        permissionStates[permissionName] =  permissionStates[permissionName] || status;
        if (!permissionStates[permissionName].onchange) {
            permissionStates[permissionName].onchange = event => {
                console.log('permission changed', event.target)
                document.querySelector('#status').textContent = JSON.stringify(
                    Object.keys(permissionStates).map(key => ({name: key, state: permissionStates[key].state}) ));

            }
        }
        document.querySelector('#status').textContent = JSON.stringify(
           Object.keys(permissionStates).map(key => ({name: key, state: permissionStates[key].state}) ));
    }

    document.querySelector('#btnRequestPermission').onclick = async () => {
        const permissionName = document.querySelector('#txtPermissionName').value;
        // disable JSLint
        try {
            const state = await navigator.permissions
                .request({name: permissionName});

            handleStatus(state);
        } catch (error) {
            handleError(error)
        }

    }

    document.querySelector('#btnQueryPermission').onclick =  async () => {
        const permissionName = document.querySelector('#txtPermissionName').value;

        const status = await navigator.permissions
            .query({name: permissionName});
        handleStatus(status);
    }

    document.querySelector('#btnRevokePermission').onclick = async () => {
        const permissionName = document.querySelector('#txtPermissionName').value;

        const status  = navigator.permissions.
            revoke({name: permissionName});

        handleStatus(status)
    }
})
