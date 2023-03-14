import type { FC } from 'react';
import React from 'react';

interface AboutProps {}

const About: FC<AboutProps> = (props) => {
  const {} = props;
  console.log('About');
  console.log(1);
  console.log('1');

  return (
    <div className="1">
      About span <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default About;
