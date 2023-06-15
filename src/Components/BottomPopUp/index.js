import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  BackHandler,
  StyleSheet,
} from 'react-native';

const {height} = Dimensions.get('window');

const swipeConfigDefault = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const animationConfigDefault = {
  useNativeDriver: true,
  duration: 50,
  speed: 14,
  bounciness: 4,
};

const isValidSwipe = (
  velocity,
  velocityThreshold,
  directionalOffset,
  directionalOffsetThreshold,
) =>
  Math.abs(velocity) > velocityThreshold &&
  Math.abs(directionalOffset) < directionalOffsetThreshold;

const BottomPopup = ({
  visible = false,
  overlayColor = 'rgba(0,0,0,0.3)',
  children,
  handleOpen = () => {},
  handleClose = () => {},
  closedHeight = 0,
  header = null,
  backdropStyle = {},
  containerStyle = {backgroundColor: '#fff'},
  animationConfig = {},
  swipeConfig = {},
  beforeOpen = () => {},
  afterOpen = () => {},
  beforeClose = () => {},
  afterClose = () => {},
  closeOnBackButton = false,
}) => {
  const [contentHeight, setHeight] = useState(0);
  const transitionY = useRef(new Animated.Value(height));

  useEffect(() => {
    visible ? animationStart() : animationEnd();
  }, [visible, animationStart, animationEnd]);

  // useEffect(() => {
  //   closeOnBackButton &&
  //     BackHandler.addEventListener('hardwareBackPress', onBackButtonPress);

  //   return () => {
  //     closeOnBackButton &&
  //       BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress);
  //   };
  // }, [closeOnBackButton, onBackButtonPress]);

  const swipeConfigConcated = {...swipeConfigDefault, ...swipeConfig};

  const animationConfigConcated = {
    ...animationConfigDefault,
    ...animationConfig,
  };

  const animationStart = useCallback(() => {
    Animated.spring(transitionY.current, {
      toValue: 0,
      ...animationConfigConcated,
      useNativeDriver: false,
    }).start(() => afterOpen());
  }, [afterOpen, animationConfigConcated]);

  const animationEnd = useCallback(() => {
    Animated.spring(transitionY.current, {
      toValue: contentHeight - closedHeight,
      ...animationConfigConcated,
      useNativeDriver: false,
    }).start(() => afterClose());
  }, [contentHeight, closedHeight, afterClose, animationConfigConcated]);

  const onLayout = event => {
    if (!contentHeight || !visible) {
      transitionY.current.setValue(
        event.nativeEvent.layout.height - closedHeight,
      );
      setHeight(event.nativeEvent.layout.height);
    }
  };

  const onBackButtonPress = () => {
    _handleClose();
    return true;
  };

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: evt => true,
    onPanResponderMove: (e, gestureState) => {
      if (visible) {
        Animated.event([null, {dy: transitionY.current}], {
          useNativeDriver: false,
        })(e, gestureState);
      } else {
        transitionY.current.setValue(
          gestureState.dy + contentHeight - closedHeight,
        );
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (_isValidVerticalSwipe(gestureState)) {
        if (gestureState.dy > 0) {
          _handleClose();
        } else {
          _handleOpen();
        }
      } else {
        const {vy, dy} = gestureState;
        const halfHeight = dy > contentHeight / 2;
        if (vy > 0 && halfHeight) {
          _handleClose();
        } else {
          _handleOpen();
        }
      }
    },
  });

  const _isValidVerticalSwipe = gestureState => {
    const {vy, dx} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = swipeConfigConcated;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  };

  const _handleOpen = () => {
    beforeOpen();
    animationStart();
    handleOpen();
  };

  const _handleClose = () => {
    beforeClose();
    handleClose();
  };

  const clampedTransition = useMemo(
    () =>
      transitionY.current.interpolate({
        inputRange: [0, contentHeight ? contentHeight - closedHeight : 1],
        outputRange: [
          contentHeight > height ? contentHeight - height + closedHeight : 0,
          contentHeight ? contentHeight - closedHeight : 1,
        ],
        extrapolate: 'clamp',
      }),
    [closedHeight, contentHeight],
  );

  const clampedOpacity = useMemo(
    () =>
      transitionY.current.interpolate({
        inputRange: [0, contentHeight ? contentHeight - closedHeight : 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    [closedHeight, contentHeight],
  );

  const clampedContentOpacity = useMemo(
    () =>
      transitionY.current.interpolate({
        inputRange: [
          0,
          contentHeight ? (contentHeight - closedHeight) / 1.1 : 0.95,
          contentHeight ? contentHeight - closedHeight : 1,
        ],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
      }),
    [closedHeight, contentHeight],
  );

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <Animated.View
        style={[
          styles.overlayStyle,
          backdropStyle,
          {
            backgroundColor: overlayColor,
            opacity: clampedOpacity,
          },
        ]}
        pointerEvents={visible ? 'auto' : 'none'}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={_handleClose}
        />
      </Animated.View>

      <Animated.View
        pointerEvents="box-none"
        accessibilityLiveRegion="polite"
        style={[
          styles.contentContainer,
          {
            transform: [
              {
                translateY: clampedTransition,
              },
            ],
            opacity:
              closedHeight > 0
                ? contentHeight
                  ? 1
                  : 0
                : clampedContentOpacity,
          },
        ]}>
        <View
          style={containerStyle}
          onLayout={onLayout}
          {..._panResponder.panHandlers}>
          {header}
          {children}
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 10,
    justifyContent: 'flex-end',
    flex: 1,
  },
  overlayTouchable: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
export {BottomPopup};
