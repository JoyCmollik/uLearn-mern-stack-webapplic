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
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
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
		hidden: {
			x: 100,
			opacity: 0,
		},
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.4,
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const commentVariant = {
		hidden: {
			x: 100,
			opacity: 0,
		},
		visible: {
			x: 0,
			opacity: 1,
		},
		exit: {
			x: 100,
			opacity: 0,
		},
	};

	return {
		voteAnimation,
		containerVariants,
		listContainerVariant,
		errorMessageVariant,
		paginationVariant,
		opacityVariant,
		commentContainerVariant,
		commentVariant,
	};
};

export default useFramerMotion;
