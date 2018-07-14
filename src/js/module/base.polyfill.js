if (!window.JSMessage) {
	try {
		// HACK: android
		eval(window.JSBridge.bridgeScript());
	} catch (e) {

	}
}
