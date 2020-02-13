import React, { useState } from "react";
import PropTypes from "prop-types";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import { useMutation } from "react-apollo-hooks";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      try {
        unfollowMutation();
      } catch {
        toast.error("Can't unfollow");
      }
    } else {
      setIsFollowing(true);
      try {
        followMutation();
      } catch {
        toast.error("Can't follow");
      }
    }
  };

  return (
    <FollowButtonPresenter
      onClick={onClick}
      isFollowing={isFollowingS}
      id={id}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
