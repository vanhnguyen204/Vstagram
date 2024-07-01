import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import Container from '../../components/Container.tsx';
import {Circle, NumberProp, Svg} from 'react-native-svg';
import {
  Camera,
  CameraCaptureError,
  useCameraDevice,
  VideoFile,
} from 'react-native-vision-camera';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {goBackNavigation, navigatePush} from '../../utils/NavigationUtils.ts';
import ShuffleSvg from '../../assets/svg/capture/ShuffleSvg.tsx';
import CloseSvg from '../../assets/svg/public/CloseSvg.tsx';
import SquareSvg from '../../assets/svg/public/SquareSvg.tsx';
import SwapSvg from '../../assets/svg/capture/SwapSvg.tsx';
import {ROUTES} from '../../navigators';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const circleStroke = 2 * Math.PI * 50;
const Capture = () => {
  const [permission, setPermission] = useState({
    hasCameraPermission: false,
    hasMicrophonePermission: false,
  });
  const [record, setRecord] = useState({
    isRecording: false,
    duration: 0,
    paused: false,
  });
  const cameraRef = useRef<Camera>(null);
  const [videoFinished, setVideoFinished] = useState<VideoFile>({
    duration: 0,
    height: 0,
    width: 0,
    path: '',
  });
  const [cameraType, setCameraType] = useState<boolean>(false);
  const device = useCameraDevice(cameraType ? 'back' : 'front');
  const MAX_RECORD_DURATION = 30;
  const strokeDashoffset = useRef(new Animated.Value(circleStroke)).current;
  const countdownRef = useRef<number>(0);
  const isFocusedScreen = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      // stop recording when screen unmount! vanh 25/6/2024
      return () => {
        cameraRef.current &&
          cameraRef.current.stopRecording().catch(e => {
            console.log(e);
          });
      };
    }, []),
  );
  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      setPermission({
        hasCameraPermission: cameraPermission === 'granted',
        hasMicrophonePermission: microphonePermission === 'granted',
      });
    };
    requestPermissions();
  }, []);

  if (!device) {
    return <Text>Loading...</Text>;
  }

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        cameraRef.current.startRecording({
          onRecordingError(error: CameraCaptureError) {
            console.error('Recording error:', error);
          },
          onRecordingFinished(video: VideoFile) {
            console.log('Recording finished:', video);
            strokeDashoffset.stopAnimation();
            strokeDashoffset.setValue(circleStroke);
            countdownRef.current = 0;
            navigatePush(ROUTES.PreviewReel, {video});
          },
          fileType: 'mov',
        });
        setRecord(prevState => ({
          ...prevState,
          isRecording: true,
          duration: 0,
          paused: false,
        }));
        animateCircle();
        const count = setInterval(() => {
          setRecord(prevState => {
            if (prevState.duration < MAX_RECORD_DURATION) {
              return {...prevState, duration: prevState.duration + 1};
            } else {
              clearInterval(countdownRef.current!);
              stopRecording();
              return prevState;
            }
          });
        }, 1000) as unknown as number;
        countdownRef.current = count;
      } catch (error) {
        console.error('Failed to start recording:', error);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      try {
        await cameraRef.current.stopRecording();
        setRecord(prevState => ({
          ...prevState,
          isRecording: false,
          paused: false,
        }));
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
      } catch (error) {
        console.error('Failed to stop recording:', error);
      }
    }
  };

  const pauseRecording = async () => {
    if (cameraRef.current) {
      try {
        console.log('Pausing recording...');
        await cameraRef.current.pauseRecording();
        setRecord(prevState => ({
          ...prevState,
          paused: true,
        }));
        clearInterval(countdownRef.current);
        strokeDashoffset.stopAnimation();
      } catch (error) {
        console.error('Failed to pause recording:', error);
      }
    }
  };

  const resumeRecording = async () => {
    if (cameraRef.current) {
      try {
        console.log('Resuming recording...');
        const video = await cameraRef.current.resumeRecording();
        console.log(video);
        setRecord(prevState => ({
          ...prevState,
          paused: false,
        }));
        const count = setInterval(() => {
          setRecord(prevState => {
            if (prevState.duration < MAX_RECORD_DURATION) {
              return {...prevState, duration: prevState.duration + 1};
            } else {
              clearInterval(countdownRef.current!);
              stopRecording();
              return prevState;
            }
          });
        }, 1000) as unknown as number;
        countdownRef.current = count;
        // Nếu đang ghi âm và không tạm dừng, tiếp tục animation
        animateCircle();
      } catch (error) {
        console.error('Failed to resume recording:', error);
      }
    }
  };

  const handleRecordPress = () => {
    if (record.isRecording) {
      if (record.paused) {
        resumeRecording();
      } else {
        pauseRecording();
      }
    } else {
      startRecording();
    }
  };

  const animateCircle = () => {
    const remainingTime = (MAX_RECORD_DURATION - record.duration) * 1000;

    Animated.timing(strokeDashoffset, {
      toValue: 0,
      duration: remainingTime,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  if (!permission.hasCameraPermission) {
    return (
      <Container justifyContent={'center'} alignItems={'center'}>
        <TextComponent
          value={'Không có quyền truy cập vào camera của thiết bị'}
        />
      </Container>
    );
  }
  if (!permission.hasMicrophonePermission) {
    return (
      <Container justifyContent={'center'} alignItems={'center'}>
        <TextComponent
          value={'Không có quyền truy cập vào micro của thiết bị'}
        />
      </Container>
    );
  }
  return (
    <Container justifyContent={'flex-end'}>
      <Box
        flex={1}
        radius={20}
        overflow={'hidden'}
        justifyContent={'space-between'}>
        <Camera
          ref={cameraRef}
          resizeMode={'cover'}
          style={[StyleSheet.absoluteFill]}
          device={device}
          isActive={isFocusedScreen}
          photo={true}
          video={true}
          audio={permission.hasMicrophonePermission}
        />
        <Box
          padding={15}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <ButtonComponent
            onPress={() => goBackNavigation()}
            alignSelf={'flex-start'}>
            <CloseSvg size={32} />
          </ButtonComponent>
          <ButtonComponent
            padding={3}
            backgroundColor={appColors.grays.gray500}
            radius={20}
            onPress={() => {
              stopRecording();
            }}
            alignSelf={'flex-start'}>
            <TextComponent value={'Tiếp tục'} />
          </ButtonComponent>
        </Box>
        <Box>
          <ButtonComponent
            scaleAnimated={true}
            activeOpacity={1}
            scaleInValue={0.7}
            alignSelf={'center'}
            onPress={handleRecordPress}>
            <Box>
              <Svg
                height={record.isRecording && !record.paused ? '130' : '80'}
                width={record.isRecording && !record.paused ? '130' : '80'}
                viewBox="0 0 120 120">
                <AnimatedCircle
                  cx="60"
                  cy="60"
                  r="50"
                  transform={[{rotate: '45deg'}]}
                  stroke={appColors.red}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={[circleStroke, circleStroke]}
                  strokeDashoffset={strokeDashoffset as unknown as NumberProp}
                />
              </Svg>
              <View
                style={{
                  backgroundColor: appColors.white,
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  left: 12,
                  bottom: 12,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 99,
                }}>
                {record.isRecording && !record.paused && (
                  <SquareSvg
                    size={32}
                    borderRadius={10}
                    color={appColors.grays.gray500}
                  />
                )}
              </View>
            </Box>
          </ButtonComponent>
          <TextComponent value={`${record.duration}s`} alignSelf={'center'} />
        </Box>
      </Box>
      <Box flexDirection={'row'} justifyContent={'space-between'} padding={15}>
        <ButtonComponent onPress={() => {}}>
          <ImageComponent
            tintColor={appColors.white}
            alignSelf={'center'}
            src={require('../../assets/icons/rounded-rectangle.png')}
            width={30}
            height={30}
          />
        </ButtonComponent>
        <ButtonComponent
          backgroundColor={appColors.grays.gray500}
          radius={99}
          padding={3}
          onPress={() => {
            setCameraType(prevState => !prevState);
          }}>
          <SwapSvg size={24} />
        </ButtonComponent>
      </Box>
    </Container>
  );
};

export default Capture;
