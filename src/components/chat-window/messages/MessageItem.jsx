import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;

  return (
    <ul className="padded mb-1">
      <div className="d-flex align-items-center font-bolder">
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        />
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>

      <div className="">
        <span className="word-break-all ">{text}</span>
      </div>
    </ul>
  );
};

export default MessageItem;
