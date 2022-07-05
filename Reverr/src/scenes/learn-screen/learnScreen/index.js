import {View, Text} from 'react-native';
import React, {lazy, Suspense} from 'react';

const LearnScreen = () => {
  const RenderCourse = lazy(() => import('./RenderCourses'));
  return (
    <View>
      <Suspense
        fallback={() => (
          <View>
            <Text>Loading....</Text>
          </View>
        )}>
        <RenderCourse />
      </Suspense>
    </View>
  );
};

export {LearnScreen};
