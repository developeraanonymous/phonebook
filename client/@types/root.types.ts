import React from 'react';

export type Children = {
	children: React.ReactNode | JSX.Element;
};

export type ChildrenNoFc = {
	children: React.PropsWithChildren<React.ReactNode | JSX.Element>;
};
