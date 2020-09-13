
import React from 'react'
import { curry } from 'ramda'

// * analytics object is provided as argument for reuse in React and React Native using Web SDKs or Native wrappers, respectively
export const withTrackingOnPress = curry(
  ({ logEvent }, WrappedComponent) => props => {
    const { onPress, event, eventParams, ...restProps } = props
    return (
      <WrappedComponent
        {...restProps}
        onPress={() => {
          if (event) {
            logEvent(event, eventParams)
          }
          props.onPress()
        }}
      />
    )
  }
)
