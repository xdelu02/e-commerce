import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Account() {
	const { getCurrentUserEmail } = useAuth();

	return (
		<div>
			<h1>ACCOUNT</h1>
			{!(getCurrentUserEmail() !== null && getCurrentUserEmail() !== '') ? (
				<>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam corrupti deserunt quod architecto, quasi perferendis mollitia maiores odio eveniet molestiae! Reprehenderit
						animi dolorum voluptates fuga iste molestiae beatae ipsa, labore maiores molestias excepturi nemo eveniet doloribus deserunt vitae suscipit dolorem, quibusdam distinctio quod
						ex dolore? Nostrum expedita laudantium saepe cum magni officiis repudiandae, error nesciunt fugit numquam excepturi deleniti assumenda atque harum quasi voluptas omnis in
						temporibus facere officia. Voluptatem molestiae a error, dolore dolorem corporis? Obcaecati, a! Atque rerum temporibus molestias accusamus, ut odit dolor consectetur ipsam
						blanditiis delectus, dolores adipisci doloribus voluptatem dicta porro repudiandae dolorum? Quam eligendi eius temporibus, ea reiciendis quidem nesciunt recusandae eum. Magnam
						voluptatem aspernatur at, enim esse et? Eligendi iste a nemo rem reiciendis distinctio repellat sapiente, nostrum mollitia, fuga, modi sit quidem laborum repudiandae incidunt
						laudantium dolor? Corrupti eius, cum nihil laboriosam dolore ut eos id atque nisi quae! Aut labore illo facilis reprehenderit qui doloremque laudantium nisi, iusto voluptatem
						quae? Maxime reiciendis quo, nisi minus libero debitis mollitia aperiam aut quasi modi? Commodi doloremque libero, minus laboriosam, perspiciatis cum iusto fugit tempore fuga
						laudantium voluptate voluptatum ex, dolorum sequi iste enim atque recusandae asperiores architecto. Quod repellendus debitis a accusamus fugit ab nam? Sunt consequatur tenetur
						at reiciendis, recusandae sapiente culpa quis sed repudiandae possimus debitis fugiat, asperiores distinctio illum est beatae praesentium itaque ab ex libero consectetur
						quisquam eligendi. Blanditiis, aut itaque nihil, explicabo architecto perspiciatis dignissimos assumenda facilis totam debitis quaerat officia nulla, quidem odit officiis
						accusamus consequatur. Porro eveniet provident eaque quisquam quae saepe deleniti, ea cupiditate dolores, doloribus ipsum aliquam, eligendi fuga ab? Molestias, voluptate alias
						ad soluta laboriosam rem, unde pariatur, quam repudiandae quasi inventore debitis culpa dolor consequuntur blanditiis harum? Quisquam sapiente eos assumenda itaque quam labore
						commodi dolorem vero sit quibusdam aliquam ipsa facere dolorum, atque dolore. Ipsa quisquam magni esse veritatis excepturi, iure cumque fugit vel earum, reprehenderit fuga
						possimus est maxime aperiam suscipit alias placeat quos rerum dolorem. Doloribus, maiores. Debitis repellendus laudantium quasi. Accusantium ea exercitationem nam recusandae
						asperiores porro, consequuntur ducimus. Cum vero saepe eaque impedit laborum nostrum accusamus incidunt placeat, dolorem consectetur autem labore quo repellat optio
						voluptatibus laboriosam qui magni, itaque soluta aperiam minus ut cumque sunt veniam? Facere, culpa reiciendis. Neque quasi magnam, nam eos impedit voluptatibus, possimus
						incidunt, suscipit odio voluptatem voluptatum explicabo dicta illum! Iusto, beatae porro voluptatem pariatur quia consectetur assumenda. Earum reprehenderit repellat illo
						deserunt odit inventore! Perferendis quas recusandae mollitia laborum saepe. Fugiat, aspernatur, modi unde nisi architecto dignissimos, perferendis adipisci recusandae quis
						consequatur necessitatibus ducimus iste sed sit odit repellendus illo dolorum fuga libero! Sint deleniti tempora sit quisquam nam, doloremque, harum pariatur aut distinctio
						expedita illo id molestias rem eum assumenda similique ullam. Repellat facere ipsa doloribus voluptas quasi cum voluptate fugiat tenetur quia quibusdam qui blanditiis, natus
						pariatur, corporis, in accusamus exercitationem harum debitis. At doloribus placeat non commodi voluptatem magni fuga odio sunt pariatur rerum laboriosam, ad, animi corporis
						quidem perferendis dolor in minus autem quas aperiam velit!
					</p>
					<div className='d-flex flex-row justify-content-evenly p-2 bd-highlight'>
						<Link to={'/login'} className='btn btn-primary'>
							Login
						</Link>
						<Link to={'/signup'} className='btn btn-secondary'>
							Signup
						</Link>
					</div>
				</>
			) : (
				<>
					<p>Gentile cliente puoi visualizzare i tuoi ordini oppure sloggarti.</p>
					<div className='d-flex flex-row justify-content-evenly p-2 bd-highlight'>
						<button className='btn btn-primary'>Logout</button>
					</div>
				</>
			)}
		</div>
	);
}
