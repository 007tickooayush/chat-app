import React from 'react';
import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePrescence } from '../misc/custom-hooks';

const getColor = prescence => {
  if (!prescence) {
    return 'gray';
  }

  switch (prescence.state) {
    case 'online':
      return 'green';
    case 'offline':
      return 'red';
    default:
      return 'gray';
  }
};

const getText = prescence => {
  if (!prescence) {
    return 'Unknown State';
  }

  return prescence.state === 'online'
    ? 'Online'
    : `Last online ${new Date(prescence.last_changed).toLocaleDateString()}`;
};

const PrescenceDot = ({ uid }) => {
  const prescence = usePrescence(uid);
  return (
    <Whisper
      placement="top"
      controlId="control-id-hover"
      trigger="hover"
      speaker={<Tooltip>{getText(prescence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getColor(prescence) }}
      />
    </Whisper>
  );
};

export default PrescenceDot;
