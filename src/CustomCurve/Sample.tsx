import React, {useMemo} from 'react';
import {Svg, Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import {Dimensions} from 'react-native';

const SampleCustomCurve = ({color}) => {
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const PHOTO_AREA_RADIUS = 100;
  const d = useMemo(() => {
    const startMiddle = SCREEN_WIDTH / 2 - (PHOTO_AREA_RADIUS / 2 + 10);
    const endMiddle = SCREEN_WIDTH / 2 + (PHOTO_AREA_RADIUS / 2 + 10);

    const left = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      {x: 0, y: 60},
      {x: startMiddle, y: 60},
    ]);

    const middleTab = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(shape.curveBasis)([
      {x: startMiddle, y: 60},
      {x: startMiddle + 3, y: 58.5},
      {x: startMiddle + 5, y: 54},
      {x: startMiddle + 5, y: 51},
      {x: startMiddle + 5, y: 51},
      {x: startMiddle + 8, y: 36},
      {x: startMiddle + 17, y: 24},
      {x: startMiddle + 28, y: 12},
      {x: startMiddle + 40, y: 7},
      {x: startMiddle + 54, y: 5},
      {x: startMiddle + 56, y: 5},
      {x: startMiddle + 80, y: 7},
      {x: startMiddle + 92, y: 12},
      {x: startMiddle + 103, y: 24},
      {x: startMiddle + 110, y: 36},
      {x: startMiddle + 115, y: 51},
      {x: startMiddle + 115, y: 51},
      {x: startMiddle + 115, y: 54},
      {x: startMiddle + 117, y: 58.5},
      {x: endMiddle, y: 60},
    ]);

    const right = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      {x: SCREEN_WIDTH, y: 60},
      {x: SCREEN_WIDTH, y: PHOTO_AREA_RADIUS},
      {x: 0, y: PHOTO_AREA_RADIUS},
      {x: 0, y: 60},
    ]);

    return `${left} ${middleTab} ${right}`;
  }, []);

  return (
    <Svg width={SCREEN_WIDTH} {...{height: 110}}>
      <Path fill={color} {...{d}} />
    </Svg>
  );
};

export default SampleCustomCurve;
