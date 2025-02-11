The solution addresses the asynchronous nature of camera initialization.  It uses `useEffect` hook to handle the asynchronous permission requests and camera initialization before rendering the camera preview.  This ensures the camera is fully prepared before rendering and prevents a blank screen. Additionally, error handling provides the user with informative feedback if the camera can't be accessed.

```javascript
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        setError('Camera permission denied!');
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>{error}</Text></View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        {/* other components here */}
      </Camera>
    </View>
  );
};
export default App;
```