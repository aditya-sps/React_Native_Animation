import React, {useMemo} from 'react';
import {Svg, Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import {Dimensions, View} from 'react-native';

const CustomCurve = ({color}) => {
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const MIDDLE_POINT = SCREEN_WIDTH / 2;
  const MID_CURVE_RADIUS = 50;

  const d = useMemo(() => {
    const left = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      {x: 15, y: 0},
      {x: MIDDLE_POINT - MID_CURVE_RADIUS, y: 0},
    ]);

    const middleTab = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(shape.curveBasis)([
      {x: MIDDLE_POINT - MID_CURVE_RADIUS, y: 0},
      {x: MIDDLE_POINT - MID_CURVE_RADIUS + 3, y: 8},
      {x: MIDDLE_POINT - MID_CURVE_RADIUS + 8, y: 24},
      {x: MIDDLE_POINT - MID_CURVE_RADIUS + 12, y: 30},
      {x: MIDDLE_POINT - MID_CURVE_RADIUS + 17, y: 36},
      {x: MIDDLE_POINT - MID_CURVE_RADIUS + 18, y: 40},
      {x: MIDDLE_POINT, y: 60},
      {x: MIDDLE_POINT + MID_CURVE_RADIUS - 18, y: 40},
      {x: MIDDLE_POINT + MID_CURVE_RADIUS - 17, y: 36},
      {x: MIDDLE_POINT + MID_CURVE_RADIUS - 12, y: 30},
      {x: MIDDLE_POINT + MID_CURVE_RADIUS - 8, y: 24},
      {x: MIDDLE_POINT + MID_CURVE_RADIUS - 3, y: 8},
      {x: MIDDLE_POINT + MID_CURVE_RADIUS, y: 0},
    ]);

    const right = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      {x: MIDDLE_POINT + MID_CURVE_RADIUS, y: 0},
      {x: SCREEN_WIDTH - 15, y: 0},
      {x: SCREEN_WIDTH - 15, y: 80},
      {x: 15, y: 80},
      {x: 15, y: 0},
    ]);

    return `${left} ${middleTab} ${right}`;
  }, []);

  return (
    <View style={{marginTop: 150}}>
      <Svg width={SCREEN_WIDTH} height={80}>
        <Path fill={color} {...{d}} />
      </Svg>
    </View>
  );
};

export default CustomCurve;
