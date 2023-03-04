const useFramerMotion = () => {
	// framer-motion animations
	const containerVariants = {
		hidden: {
			x: '-100vw',
			opacity: 0,
		},
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 270,
				mass: 4,
				damping: 50,
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
		exit: {
			x: '100vw',
			opacity: 0,
			transition: { ease: 'easeOut' },
		},
	};
	// animation for votes element
	const voteAnimation = {
		hidden: { scale: 1.9, rotate: -10 },
		visible: {
			scale: 1,
			rotate: 0,
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 10,
			},
		},
		exit: {
			scale: 0,
			transition: {
				duration: 1.4,
			},
		},
	};
	const listContainerVariant = {
		hidden: { opacity: 0.8, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
		},
	};

	const itemVariant = {
		hidden: { opacity: 0 },
		visible: (custom) => ({
			opacity: 1,
			transition: { delay: custom },
		}),
	};

	const list = {
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
			},
		},
	};

	const item = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
		animate: { y: 10 },
	};

	const errorMessageVariant = {
		hidden: { y: 100, scale: 0.9, opacity: 0.4 },
		visible: {
			y: 0,
			scale: 1,
			opacity: 1,
			transition: {
				type: 'spring',
				mass: 0.8,
				damping: 8,
				duration: 0.1,
			},
		},
	};
	const paginationVariant = {
		hidden: { opacity: 0, y: 100 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.4,
				duration: 0.4,
			},
		},
	};

	const opacityVariant = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const commentContainerVariant = {
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
			},
		},
	};

	const commentVariant = {
		hidden: {
			x: -140,
			opacity: 0,
			scale: 0.9,
		},
		visible: {
			x: 0,
			opacity: 1,
			scale: 1,
		},
		exit: {
			x: 50,
			opacity: 0,
		},
	};

	const cardVariants = {
		offscreen: {
			x: '50vw',
			rotate: -10,
		},
		onscreen: {
			x: '0vw',
			rotate: 0,
			transition: {
				type: 'Spring',
				bounce: 0.4,
				duration: 0.8,
			},
		},
	};

	const ariseVariants = {
		offscreen: {
			y: '25vh',
			opacity: 0,
		},
		onscreen: {
			y: '0vh',
			opacity: 1,
			transition: {
				type: 'stiff',
				velocity: 80,
				duration: 0.55,
			},
		},
	};

	const titleVariants = {
		offscreen: {
			y: 100,
			opacity: 0,
		},
		onscreen: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				bounce: 0.4,
				duration: 0.8,
			},
		},
	};

	return {
		voteAnimation,
		containerVariants,
		listContainerVariant,
		itemVariant,
		errorMessageVariant,
		list,
		item,
		paginationVariant,
		opacityVariant,
		commentContainerVariant,
		commentVariant,
		cardVariants,
		ariseVariants,
		titleVariants,
	};
};

export default useFramerMotion;
