import React from 'react';
import styled from '@emotion/styled';
import { Meta, StoryObj } from '@storybook/react-vite';
import Slider from './';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const meta: Meta = {
  title: 'Slider',
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Slider {...args} />
    </Container>
  ),
  args: {
    value: 0,
    min: 0,
    max: 100,
    label: 'Slider label',
    sublabel: '(sublabel}',
    withValue: false,
    disabled: false,
  },
  argTypes: {
    onChange: { control: { disable: true } },
    theme: { control: { disable: true } },
  },
};
