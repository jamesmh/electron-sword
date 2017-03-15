import { remote } from 'electron';

export default _ => {
    const globals = remote.getGlobal("Sword");
    
    return {
        resources: globals.resources
    };
}