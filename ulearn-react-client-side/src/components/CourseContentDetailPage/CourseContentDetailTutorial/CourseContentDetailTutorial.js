import React, { useEffect, useState } from 'react';
import { CgArrowsScrollV, CgNotes, CgSelect } from 'react-icons/cg';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const operatorTable = [
	{
		id: 1001,
		operator: 'a + b',
		name: 'Addition',
		Description: 'Sum of a and b',
	},
	{
		id: 1002,
		operator: 'a - b',
		name: 'Subtraction',
		Description: 'Difference of a and b',
	},
	{
		id: 1003,
		operator: 'a * b',
		name: 'Multiplication',
		Description: 'Multiplication of a and b',
	},
	{
		id: 1004,
		operator: 'a / b',
		name: 'True Division',
		Description: 'Quotient of a and b',
	},
	{
		id: 1005,
		operator: 'a // b',
		name: 'Floor Division',
		Description: 'Quotient of a and b,removing fractional parts',
	},
	{
		id: 1006,
		operator: 'a % b',
		name: 'Modulus',
		Description: 'Integer remainder after division of a by b',
	},
	{
		id: 1007,
		operator: 'a ** b',
		name: 'Exponentiation	',
		Description: 'a raised to the power of b',
	},
	{
		id: 1008,
		operator: '-a',
		name: 'Negation',
		Description: 'The negative of a',
	},
];

const CourseContentDetailTutorial = () => {
	const [show, setShow] = useState(false);
	const [showTableContent, setShowTableContent] = useState(true);
	const [headings, setHeadings] = useState([]);
	useEffect(() => {
		const elements = Array.from(document.getElementsByTagName('h3'))
			.filter((element) => element.id)
			.map((element) => ({
				id: element.id,
				text: element.textContent ?? '',
			}));
		setHeadings(elements);
	}, []);
	return (
		<div className='pt-6'>
			{/*----------------------title and image-------------------------------*/}
			<div className='grid grid-cols-2'>
				<article className=' flex items-center space-x-3'>
					<div>
						<img
							src='https://www.kaggle.com/static/images/education/km/python.svg'
							alt=''
						/>
					</div>
					<h2 className='text-black font-semibold text-sm'>
						Learn Tutorial <br />
						<span className='underline text-sm font-normal'>
							{' '}
							Python
						</span>
					</h2>
				</article>
				{/*--------------------course steps-----------------------*/}
				<article className=' flex items-center space-x-3'></article>
			</div>
			{/*-----------------------course description--------------------------*/}
			<div>
				<div className='grid grid-cols-12 gap-6'>
					{/*-------------contents--------------*/}
					<div className='col-span-8 p-8'>
						<p>
							This course covers the key Python skills you’ll need
							so you can start using Python for data science. The
							course is ideal for someone with some previous
							coding experience who wants to add Python to their
							repertoire. (If you're a first-time coder, you are
							encouraged to check out our Intro to Programming
							course, which is designed for complete beginners who
							would like to get started with Python.)
							<br />
						</p>
						<p className=' text-sm '>
							We'll start with a brief overview of Python syntax,
							variable assignment, and arithmetic operators.
						</p>
						{/*----------------content title-------------------*/}
						<h3 id='main-title' className='text-2xl pt-8'>
							Hello, Python!
						</h3>
						<div className=' pb-8'>
							<p className=''>
								Python was named for the British comedy troupe
								Monty Python, so we'll make our first Python
								program a homage to their skit <br /> about
								Spam.
							</p>
							<p className='block text-sm'>
								Just for fun, try reading over the code below
								and predicting what it's going to do when run.
								(If you have no idea, that's fine!)
							</p>
							<p className='block text-sm'>
								Then click the "output" button to see the
								results of our program
							</p>
						</div>
						{/*---------------code part 1----------------*/}
						<div className='flex'>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[1]'}:</span>
							</div>
							<div className='border p-6 w-full'>
								<p className=''>
									spam_amount = 0 print(spam_amount)
								</p>
								<p className=''>
									# Ordering Spam, egg, Spam, Spam, bacon and
									Spam (4 more servings of Spam)
								</p>
								<p className=''>
									spam_amount = spam_amount + 4
								</p>
								<p className=''>
									if spam_amount {'>'} than 0: print("But I
									don't want ANY spam!")
								</p>
								<p className=''>
									viking_song = "Spam " * spam_amount
									print(viking_song)
								</p>
							</div>
						</div>
						{/*----------------show hidden output-----------------*/}
						<div
							className='pt-8 ml-12'
							onClick={() => setShow(!show)}
						>
							<div className='text-sm text-dark font-medium flex justify-center space-x-4 items-center'>
								{!show ? (
									<>
										<div className='border-t-2  border-gray-300  w-full'></div>
										<div className='whitespace-nowrap'>
											<CgSelect className='inline text-base' />
											show hidden output
										</div>
										<div className='border-t-2  border-gray-300  w-full'></div>
									</>
								) : (
									<>
										<div className='border-t-2  border-gray-300  w-full'></div>
										<div className='whitespace-nowrap'>
											<CgArrowsScrollV className='inline text-base' />
											hide output
										</div>
										<div className='border-t-2  border-gray-300  w-full'></div>
									</>
								)}
							</div>
						</div>
						{show && (
							<div className='pl-14 '>
								<p className=''>0</p>{' '}
								<p className=''>But I don't want ANY spam!</p>
								<p className=''>Spam Spam Spam Spam</p>
							</div>
						)}
						<p className='py-8 pl-14'>
							There's a lot to unpack here! This silly program
							demonstrates many important aspects of what Python
							code looks like and how it works. Let's review the
							code from top to bottom.
						</p>
						{/*------------------code 2----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[2]'}:</span>
							</div>
							<div className='border w-full p-4'>
								spam_amount = 0
							</div>
						</article>
						<div className='pt-8 pb-5 pl-14'>
							<span className='font-semibold '>
								{' '}
								Variable assignment:{' '}
							</span>{' '}
							Here we create a variable called spam_amount and
							assign it the value of 0 using =, which is called
							the assignment operator.
						</div>
						{/*---------------------Note---------------------*/}
						<article className=' border-gray-300 pl-14 '>
							<div className='pb-5 border-l-2 pl-5'>
								<span className='font-semibold'> Note: </span>{' '}
								If you've programmed in certain other languages
								(like Java or C++), you might be noticing some
								things <br /> Python doesn't require us to do
								here:
							</div>
							<ul className='list-disc pl-5 flex flex-col space-y-2'>
								<li>
									we don't need to "declare" spam_amount
									before assigning to it
								</li>
								<li>
									we don't need to tell Python what type of
									value spam_amount is going to refer to. In
									fact, we can even go on to reassign
									spam_amount to refer to a different sort of
									thing like a string or a boolean.
								</li>
							</ul>
						</article>
						{/*------------------code 3----------------------*/}
						<article className='flex  pt-8'>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[3]'}:</span>
							</div>
							<div className='border w-full p-4'>
								{'print(spam_amount)'}
							</div>
						</article>
						<div className='py-8 pl-14'>0</div>
						<div className='pt-8 pb-5 pl-14'>
							<span className='font-semibold '>
								{' '}
								Function calls:{' '}
							</span>{' '}
							print is a Python function that displays the value
							passed to it on the screen. We call functions by
							putting parentheses after their name, and putting
							the inputs (or arguments) to the function in those
							parentheses.
						</div>
						{/*------------------code 4----------------------*/}
						<article className='flex  pt-8'>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[4]'}:</span>
							</div>
							<div className='border w-full p-4'>
								<span className='text-font2'>
									# Ordering Spam, egg, Spam, Spam, bacon and
									Spam (4 more servings of Spam)
								</span>
								<br />
								spam_amount = 0
							</div>
						</article>
						<div className='flex flex-col pt-8 space-y-4 pl-14'>
							<span>
								The first line above is a comment. In Python,
								comments begin with the # symbol.
							</span>{' '}
							<span>
								Next we see an example of reassignment.
								Reassigning the value of an existing variable
								looks just the same as creating a variable - it
								still uses the = assignment operator.
							</span>
							<span>
								In this case, the value we're assigning to
								spam_amount involves some simple arithmetic on
								its previous value. When it encounters this
								line, Python evaluates the expression on the
								right-hand-side of the = (0 + 4 = 4), and then
								assigns that value to the variable on the
								left-hand-side.
							</span>
						</div>
						{/*------------------code 5----------------------*/}
						<article className='flex  pt-8'>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[5]'}:</span>
							</div>
							<div className='border w-full p-4'>
								<span className='text-font2'>
									if spam_amount {'>'} 0:
									<br />
									print("But I don't want ANY spam!")
								</span>
								<br />
								<span>
									viking_song = "Spam Spam Spam"
									print(viking_song)
								</span>
							</div>
						</article>
						<div className='flex flex-col space-y-3 pl-14 pt-8'>
							<span>
								We won't talk much about "conditionals" until
								later, but, even if you've never coded before,
								you can probably guess what this does. Python is
								prized for its readability and the simplicity.
							</span>
							<span>
								Note how we indicated which code belongs to the
								if. "But I don't want ANY spam!" is only
								supposed to be printed if spam_amount is
								positive. But the later code (like
								print(viking_song)) should be executed no matter
								what. How do we (and Python) know that?
							</span>
							<span>
								The colon (:) at the end of the if line
								indicates that a new code block is starting.
								Subsequent lines which are indented are part of
								that code block.
							</span>
						</div>
						{/*----------------------Note------------------------*/}
						<article className=' pl-14 pt-8 '>
							<div className='pb-5 border-l-2 border-gray-300 pl-5'>
								<span className='font-semibold'> Note: </span>{' '}
								If you've coded before, you might know that some
								other languages use {`{curly braces}`} to mark
								the beginning and end of code blocks. Python's
								use of meaningful whitespace can be surprising
								to programmers who are accustomed to other
								languages, but in practice it can lead to more
								consistent and readable code than languages that
								do not enforce indentation of code blocks.
							</div>
						</article>
						<div className='pt-2 pl-14 flex flex-col space-y-3'>
							<span>
								The later lines dealing with viking_song are not
								indented with an extra 4 spaces, so they're not
								a part of the if's code block. We'll see more
								examples of indented code blocks later when we
								define functions and using loops.
							</span>
							<span>
								This code snippet is also our first sighting of
								a string in Python:
							</span>
						</div>
						<div className='pl-14 py-8'>
							<div className='border p-4'>
								<span className='text-red-500'>
									{`"But I don't want ANY spam!"`}
								</span>
							</div>
						</div>
						<div className='pt-2 pl-14 flex flex-col space-y-3'>
							<span>
								Strings can be marked either by double or single
								quotation marks. (But because this particular
								string contains a single-quote character, we
								might confuse Python by trying to surround it
								with single-quotes, unless we're careful.)
							</span>
						</div>
						{/*------------------code 6----------------------*/}
						<article className='flex  pt-8'>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[6]'}:</span>
							</div>
							<div className='border w-full p-4'>
								<span className='text-font1'>
									viking_song = "Spam " * spam_amount
									<br />
									print(viking_song)
								</span>
								<br />
							</div>
						</article>
						<div className='py-8 pl-14'>Spam Spam Spam Spam</div>
						<div className='pl-14'>
							The * operator can be used to multiply two numbers
							(3 * 3 evaluates to 9), but we can also multiply a
							string by a number, to get a version that's been
							repeated that many times. Python offers a number of
							cheeky little time-saving tricks like this where
							operators like * and + have a different meaning
							depending on what kind of thing they're applied to.
							(The technical term for this is operator
							overloading.)
						</div>
						{/*------------------numbers and arithmetic in python-------------------*/}
						<div className='py-8 pl-14 text-xl'>
							<h2 className=''>
								Numbers and arithmetic in Python
							</h2>
							<span className='text-sm'>
								We've already seen an example of a variable
								containing a number above:
							</span>
						</div>
						{/*------------------code 7----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[7]'}:</span>
							</div>
							<div className='border w-full p-4'>
								spam_amount = 0
							</div>
						</article>
						<div className='py-8 pl-14'>
							"Number" is a fine informal name for the kind of
							thing, but if we wanted to be more technical, we
							could ask Python how it would describe the type of
							thing that spam_amount is:
						</div>
						{/*------------------code 8----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[8]'}:</span>
							</div>
							<div className='border w-full p-4'>
								spam_amount = 0
							</div>
						</article>
						{/*------------------code output 8----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>out</span>{' '}
								<span className='pr-2'>{'[8]'}:</span>
							</div>
							<div className='w-full p-4'>int</div>
						</article>
						<div className='pl-14 py-8'>
							t's an int - short for integer. There's another sort
							of number we commonly encounter in Python:
						</div>
						{/*------------------code 9----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[9]'}:</span>
							</div>
							<div className='border w-full p-4'>type(19.95)</div>
						</article>
						{/*------------------code output 9----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>out</span>{' '}
								<span className='pr-2'>{'[9]'}:</span>
							</div>
							<div className='w-full p-4'>float</div>
						</article>
						<div>
							<div className='pl-14 py-8 flex flex-col space-y-3'>
								<span className='block'>
									A float is a number with a decimal place -
									very useful for representing things like
									weights or proportions.
								</span>
								<span className='block'>
									type() is the second built-in function we've
									seen (after print()), and it's another good
									one to remember. It's very useful to be able
									to ask Python "what kind of thing is this?"
								</span>
							</div>
						</div>
						<div className='pt-8 pl-14'>
							A natural thing to want to do with numbers is
							perform arithmetic. We've seen the + operator for
							addition, and the * operator for multiplication.
							Python also has us covered for the rest of the basic
							buttons on your calculator:
						</div>
						{/*-----------------------operator table ---------------------*/}
						<div className='py-8 pl-14'>
							<table className='border-collapse border border-slate-300 '>
								<thead>
									<tr>
										<th className='border border-slate-300 p-2'>
											Operator
										</th>
										<th className='border border-slate-300 p-2'>
											Name
										</th>
										<th className='border border-slate-300 p-2'>
											Description
										</th>
									</tr>
								</thead>
								<tbody>
									{operatorTable.map((datas) => {
										const {
											name,
											id,
											Description,
											operator,
										} = datas;
										return (
											<tr
												key={id}
												className='bg-white hover:bg-blue-200'
											>
												<td className='border border-slate-300 p-2'>
													{operator}
												</td>
												<td className='border border-slate-300 p-2'>
													{name}
												</td>
												<td className='border border-slate-300 p-2'>
													{Description}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className='pt-1 pl-14'>
							<span>
								One interesting observation here is that,
								whereas your calculator probably just has one
								button for division, Python can do two kinds.
								"True division" is basically what your
								calculator does:
							</span>
						</div>
						{/*------------------code 10----------------------*/}
						<article className='flex  pt-8'>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[10]'}:</span>
							</div>
							<div className='border w-full p-4'>
								<span className='block'>print(5 / 2)</span>
								<span className='block'>print(6 / 2)</span>
							</div>
						</article>
						<div className='pl-16 pt-4'>
							<span className='block'>2.5 </span>
							<span className='block'>3.0</span>
							<div className='pt-8'>
								<span className='block'>
									It always gives us a float.{' '}
								</span>
								<span className='block'>
									The // operator gives us a result that's
									rounded down to the next integer.
								</span>
							</div>
						</div>
						{/*------------------code 11----------------------*/}
						<article className='flex  pt-8'>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[11]'}:</span>
							</div>
							<div className='border w-full p-4'>
								<span className='block'>print(5 // 2)</span>
								<span className='block'>print(6 // 2)</span>
							</div>
						</article>
						<div className='pl-16 pt-4'>
							<span className='block'>2</span>
							<span className='block'>3</span>
						</div>
						<div className='pt-8 pl-14'>
							<span className='block'>
								Can you think of where this would be useful?
								You'll see an example soon in the coding
								challenges
							</span>
						</div>
						{/*-----------------orders of operation----------------*/}
						<div className='pl-14 pt-8'>
							<h2 className='font-medium  text-base'>
								Order of operations
							</h2>
							<div className='flex flex-col space-y-3'>
								<span className='block'>
									The arithmetic we learned in primary school
									has conventions about the order in which
									operations are evaluated. Some remember
									these by a mnemonic such as PEMDAS -
									Parentheses, Exponents,
									Multiplication/Division,
									Addition/Subtraction.
								</span>
								<span className='block'>
									Python follows similar rules about which
									calculations to perform first. They're
									mostly pretty intuitive.
								</span>
							</div>
						</div>
						{/*------------------code 12----------------------*/}
						<article className='flex  pt-8 '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[12]'}:</span>
							</div>
							<div className='border w-full p-4'>8 - 3 + 2</div>
						</article>
						{/*------------------code output 12----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>out</span>{' '}
								<span className='pr-2'>{'[12]'}:</span>
							</div>
							<div className='w-full p-4'>7</div>
						</article>
						{/*------------------code 13----------------------*/}
						<article className='flex  pt-8 '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[13]'}:</span>
							</div>
							<div className='border w-full p-4'>-3 + 4 * 2</div>
						</article>
						{/*------------------code output 13----------------------*/}
						<article className='flex  '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>out</span>{' '}
								<span className='pr-2'>{'[13]'}:</span>
							</div>
							<div className='w-full p-4'>5</div>
						</article>
						<div className='pl-14 py-8'>
							<span>
								Sometimes the default order of operations isn't
								what we want:
							</span>
						</div>
						{/*------------------code 14----------------------*/}
						<article className='flex  pt-8 '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[14]'}:</span>
							</div>
							<div className='border w-full p-4 flex flex-col'>
								<span className='block'>
									hat_height_cm = 25
								</span>
								<span className='block'>
									my_height_cm = 190
								</span>
								<span className='block text-font2'>
									# How tall am I, in meters, when wearing my
									hat?
								</span>
								<span className='block '>
									total_height_meters = hat_height_cm +
									my_height_cm / 100
								</span>
								<span className='block'>
									print("Height in meters =",
									total_height_meters, "?")
								</span>
							</div>
						</article>
						<div className='pl-16 py-8'>
							<span>Height in meters = 26.9 ?</span>
						</div>
						<div className='pl-14 py-8'>
							<span>
								Parentheses are useful here. You can add them to
								force Python to evaluate sub-expressions in
								whatever order you want.
							</span>
						</div>
						{/*------------------code 15----------------------*/}
						<article className='flex  pt-8 '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[15]'}:</span>
							</div>
							<div className='border w-full p-4 flex flex-col'>
								<span className='block'>
									total_height_meters = (hat_height_cm +
									my_height_cm) / 100
								</span>
								<span className='block'>
									print("Height in meters =",
									total_height_meters)
								</span>
								<span className='block text-font2'>
									# How tall am I, in meters, when wearing my
									hat?
								</span>
							</div>
						</article>
						<div className='pl-16 py-8'>
							<span>Height in meters = 2.15</span>
						</div>
						{/*--------------------BUILT IN FUNCTION WORKING WITH NUMBERS-----------------------*/}
						<div className='pl-14 py-8'>
							<h2 className='font-medium text-base'>
								Builtin functions for working with numbers
							</h2>
							<span className='pl-2'>
								min and max return the minimum and maximum of
								their arguments, respectively...
							</span>
						</div>
						{/*------------------code 16----------------------*/}
						<article className='flex  pt-8 '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[16]'}:</span>
							</div>
							<div className='border w-full p-4 flex flex-col'>
								<span className='block'>
									print(min(1, 2, 3))
								</span>
								<span className='block'>
									print(max(1, 2, 3))
								</span>
							</div>
						</article>
						<div className='pl-16 py-8'>
							<span className='block'>1</span>
							<span className='block'>3</span>
						</div>
						<div className='pl-14 py-8'>
							<span className='block'>
								abs returns the absolute value of an argument
							</span>
						</div>
						{/*------------------code 17----------------------*/}
						<article className='flex  pt-8 '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[17]'}:</span>
							</div>
							<div className='border w-full p-4 flex flex-col'>
								<span className='block'>print(abs(32))</span>
								<span className='block'>print(abs(-32))</span>
							</div>
						</article>
						<div className='pl-16 py-8'>
							<span className='block'>32</span>
							<span className='block'>32</span>
						</div>
						<div className='pl-14 py-8'>
							<span className='block'>
								In addition to being the names of Python's two
								main numerical types, int and float can also be
								called as functions which convert their
								arguments to the corresponding type:
							</span>
						</div>
						{/*------------------code 18----------------------*/}
						<article className='flex  pt-8 '>
							<div className='flex flex-row space-x-3 '>
								<span className='text-sm '>In</span>{' '}
								<span className='pr-2'>{'[18]'}:</span>
							</div>
							<div className='border w-full p-4 flex flex-col'>
								<span className='block'>print(float(10))</span>
								<span className='block'>print(int(3.33))</span>
								<span className='block text-font2'>
									# They can even be called on strings!
								</span>
								<span className='block'>
									print(int('807') + 1)
								</span>
							</div>
						</article>
						<div className='pl-16 py-8'>
							<span className='block'>10.0 </span>
							<span className='block'>3 </span>
							<span className='block'>808</span>
						</div>
						{/*----------------content2 title-------------------*/}
						<div className='pl-14 pb-8'>
							<h3 id='secondary-title' className='text-2xl pt-8'>
								Your Turn
							</h3>

							<span className='block text-sm'>
								Now is your chance.{' '}
								<span className='text-primary'>
									Try your first Python programming exercise!
								</span>
							</span>
							<div className='pt-10 border-b-2 border-gray-300'></div>
							<span className='text-font2 italic'>
								Have questions or comments? Visit the course
								discussion forum to chat with other learners.
							</span>
						</div>
					</div>

					{/*----------------table of contents------------------*/}
					<div className='col-span-4 flex justify-end '>
						{
							<nav className='fixed '>
								<div
									onClick={() =>
										setShowTableContent(!showTableContent)
									}
								>
									<div>
										{showTableContent ? (
											<div className='flex items-center space-x-32 pb-4'>
												<h4 className='text-base font-semibold'>
													Table of Contents
												</h4>
												<div className='pb-2'>
													<IoIosArrowForward className='text-lg ' />
												</div>
											</div>
										) : (
											<div className='flex items-center'>
												<IoIosArrowBack className='text-base font-bold' />
												<CgNotes className='text-base font-bold' />
											</div>
										)}
									</div>
								</div>
								{showTableContent && (
									<ul className='flex flex-col justify-center space-y-3'>
										{headings.map((heading) => (
											<li
												key={heading.id}
												className={`${
													heading.text ===
													'Hello, Python!'
														? 'border-l-4 rounded-sm border-black pl-5'
														: 'border-l-4 border-white pl-5'
												}`}
											>
												<a
													href={`#${heading.id}`}
													className='text-black hover:text-primary'
												>
													{heading.text}
												</a>
											</li>
										))}
									</ul>
								)}
							</nav>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseContentDetailTutorial;
