<template>    
		<div class="d-flex" v-view.once="seencreateMessage" v-if="$auth.user()._id == data.user_id || $auth.check(['editor'])">
			<image-gallery :files="prepareImages" :active="active.gallery_file" v-if="active.gallery" @close="active.gallery = false"></image-gallery>

			<message-view :message="data" v-if="active.view" @close="active.view = false"></message-view>


			<div class="card" :id="data._id" v-if="data.special_post">
				<div class="card_one">

					<div v-if="data.url">
					
							<div style="text-align: right;padding: 10px;position: absolute;right: 15px;font-size: 14px;"><a style="text-decoration:none;color:#0769F0;" href="#" @click.stop.prevent="opencategories()">{{ messagecategories }}</a></div>

							<div class="card-header" :style="messageHeaderStyles" style="padding: 1.5rem 1rem 1.5rem 1rem;">
								
								<div v-if="data.categories_title" class="card-title-special font-weight-bold pl-4" style="margin-top: 25px;" v-html="messageTopiccommentspecial"></div>

								<div v-else class="card-title-special font-weight-bold pl-4 mt-2" v-html="messageTopiccommentspecial"></div>

							</div>
							
							<div class="card-body" style="min-height:auto;border-radius: 0px 0px 20px 0;" @click.stop="openView()" v-if="((data.url && data.site_name) || data.title || data.files.length || data.description)">
							
							<div :style="messageHeaderFont" class="clamp_special" style="font-size:14px;padding-bottom:10px;" v-if="data.comment" v-html="messageTopiccomment"></div>

							<div style="border: 1px solid #E7E7E7;border-radius: 8px;" v-if="prepareFiles">
							
								<div class="d-flex flex-row flex-wrap">
									<div class="file" style="cursor:pointer;" v-for="(file, i) in prepareFiles" :key="i">

										<div class="file__image" @click.stop="openGallery(file)" v-if="file.type == 'image'">
											<img class="file__image" :src="file.preview">
										</div>

										<div class="file__image-group" @click.stop="openGallery(file.group[0])" v-if="file.type == 'image_group'">
											<img class="file__image" :src="file.group[0].preview">
											<span class="file__image-group-count">
												{{ '+' + file.group.length }}
											</span>
										</div>

										<video :poster="file.preview" class="file__video w-100" controls :src="file.url" v-if="file.type == 'video'"></video>

										<iframe class="file__iframe w-100" :src="file.url" v-if="file.type == 'iframe'" frameborder="0" allowfullscreen></iframe>

										<div class="file__file bg-primary" v-if="file.type == 'file'" @click.stop="openFile(file.url)">
											<i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
										</div>

										<div class="file__file bg-primary" v-if="file.type == 'audio'" @click.stop="toggleAudio(file.url)">
											<i class="mdi mdi-music text-white" style="font-size:42px;"></i>
										</div>

									</div>
								</div>
								
								
								<div class="card-title font-weight-bold pl-4 mt-2 mb-3" v-if="data.title">{{ messageTopictitle }}</div>
								
								<div class="d-flex flex-row align-items-center pl-4" v-if="data.url && data.site_name">
									<div class="d-flex flex-column">
										<div class="d-flex flex-row">
											<a href="#" @click.stop.prevent="openLink(data.url, '_blank')" v-html="messageTopicSitename"></a>
										</div>

									</div>
								</div>
								
								<p class="card-text mx-4 mt-2 mb-4" style="font-size:14px;" v-if="data.description">{{ messageTopicdescription }}</p>								
								</div>
							</div>
					</div>

					<div v-else>
							<div style="text-align: right;padding: 10px;position: absolute;right: 15px;font-size: 14px;"><a style="text-decoration:none;color:#0769F0;" href="#" @click.stop.prevent="opencategories()">{{ messagecategories }}</a></div>

							<div class="card-header" :style="messageHeaderStyles" style="padding: 1.5rem 1rem 1.5rem 1rem;">

								<div v-if="data.categories_title" class="card-title-special font-weight-bold pl-4" v-html="messageTopiccommentspecial" style="margin-top: 25px;"></div>

								<div v-else class="card-title-special font-weight-bold pl-4 mt-2" v-html="messageTopiccommentspecial"></div>

							</div>

							<div class="card-body" style="min-height:auto;" @click.stop="openView()" v-if="data.comment">

				 
								<div :style="messageHeaderFont" class="clamp_special" v-if="data.comment" style="padding-bottom: 10px; font-size: 14px;" v-html="messageTopiccomment"></div>

								
								<div class="d-flex flex-row flex-wrap" v-if="prepareFiles">
									<div class="file" style="cursor:pointer;padding:0px;" v-for="(file, i) in prepareFiles" :key="i">

										<div class="file__image" @click.stop="openGallery(file)" v-if="file.type == 'image'">
											<img class="file__image" :src="file.preview">
										</div>

										<div class="file__image-group" @click.stop="openGallery(file.group[0])" v-if="file.type == 'image_group'">
											<img class="file__image" :src="file.group[0].preview">
											<span class="file__image-group-count">
												{{ '+' + file.group.length }}
											</span>
										</div>

										<video :poster="file.preview" class="file__video w-100" controls :src="file.url" v-if="file.type == 'video'"></video>

										<iframe class="file__iframe w-100" :src="file.url" v-if="file.type == 'iframe'" frameborder="0" allowfullscreen></iframe>

										<div class="file__file bg-primary" v-if="file.type == 'file'" @click.stop="openFile(file.url)">
											<i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
										</div>

										<div class="file__file bg-primary" v-if="file.type == 'audio'" @click.stop="toggleAudio(file.url)">
											<i class="mdi mdi-music text-white" style="font-size:42px;"></i>
										</div>

									</div>
								</div>
								
							</div>
					</div>

					<div style="border-top:1px solid #E7E7E7;padding-top: 10px;">
						<div class="mdi ellipse_right_bar_msg mdi-close text-secondary" 
							style="cursor:pointer;font-size:20px;float: right;" 
							v-if="$auth.check(['editor']) || ($auth.check(['creator']) && $auth.user()._id == data.user_id)"
							@click="removeMessage(data)"></div>

						<div class="mdi ellipse_right_bar_msg mdi-pencil"
							:class="{ 
								'text-primary': passedData && passedData._id == data._id, 
								'text-secondary': !passedData
							}"
							style="cursor:pointer;font-size:20px;float: right;"
							v-if="$auth.check(['editor']) || ($auth.check(['creator']) && $auth.user()._id == data.user_id)"
							@click="editMessage(data)"></div>
							

						<div class="text-secondary mdi ellipse_right_bar_msg mdi-email-outline"
							style="cursor:pointer;font-size:20px;float: right;"
							v-if="$auth.check(['editor'])"
							@click="postnow(data)"></div>					

							<div class="data_attached" v-if="data.attached">
								<div style="font-size:10px;"><b>{{ attached_time }}</b></div>
								<div style="font-size:8px;">{{ attached_date }}</div>
							</div>
							
							
						<div v-show="popup1" class="popup1">
							<div @click="postnow(data)">
								<i class="mdi mdi-email-outline" style="vertical-align: middle;font-size:20px;margin-right:5px;"></i>	
								Post now
							</div>
							<div @click="postlater()">
								<i class="mdi mdi-clock" style="vertical-align: middle;font-size:20px;margin-right:5px;"></i> 
								Post later
							</div>
						</div>
						
						<div v-show="popup2" class="popup2">
							<div style="float:right;margin-top: -7px;"><i class="mdi mdi-close" style="font-size:24px;color: #cacaca;" @click="closepopup()"></i></div>
							<div>
								<i class="mdi mdi-clock" style="float:left;font-size: 20px;color: #cacaca;vertical-align: middle;margin-top: -3px;"></i> 
								<div style="float: left;margin-left: 7px;color: #000;font-size: 16px;">Shedule post</div>
							</div>
							
							<div style="clear:both;"></div>
							
							<div style="margin-top: 10px;">Date</div>
							
							<div style="margin-top: 10px;">
							<select :id="'day' + data._id" style="background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="01">1</option>
								<option value="02">2</option>
								<option value="03">3</option>
								<option value="04">4</option>
								<option value="05">5</option>
								<option value="06">6</option>
								<option value="07">7</option>
								<option value="08">8</option>
								<option value="09">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
							</select>
							
							<select :id="'month' + data._id" style="margin-left:10px;background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="01">January</option>
								<option value="02">February</option>
								<option value="03">March</option>
								<option value="04">April</option>
								<option value="05">May</option>
								<option value="06">June</option>
								<option value="07">July</option>
								<option value="08">August</option>
								<option value="09">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</select>
							
							<select :id="'year' + data._id" style="margin-left:10px;background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="2020">2020</option>
								<option value="2021">2021</option>
								<option value="2022">2022</option>
								<option value="2023">2023</option>
								<option value="2024">2024</option>
							</select>				
							</div>
							
							<div style="margin-top: 15px;">Time</div>
							<div style="margin-top: 10px;">
							<select :id="'hour' + data._id" style="background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="00">00</option>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
							</select>
							
							<select :id="'minute' + data._id" style="margin-left:10px;background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="00">00</option>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
								<option value="32">32</option>
								<option value="33">33</option>
								<option value="34">34</option>
								<option value="35">35</option>
								<option value="36">36</option>
								<option value="37">37</option>
								<option value="38">38</option>
								<option value="39">39</option>
								<option value="40">40</option>
								<option value="41">41</option>
								<option value="42">42</option>
								<option value="43">43</option>
								<option value="44">44</option>
								<option value="45">45</option>
								<option value="46">46</option>
								<option value="47">47</option>
								<option value="48">48</option>
								<option value="49">49</option>
								<option value="50">50</option>
								<option value="51">51</option>
								<option value="52">52</option>
								<option value="53">53</option>
								<option value="54">54</option>
								<option value="55">55</option>
								<option value="56">56</option>
								<option value="57">57</option>
								<option value="58">58</option>
								<option value="59">59</option>
							</select>
							</div>
							<br>
							<div style="float:left;margin-left:60px;" @click="resetpost(data._id)">Reset</div> 
							<div style="float:left;margin-left:50px;color:#1b89fc;" @click="savepost(data)">Save</div>
						</div>	
					</div>							

				</div>	

					<div style="margin-right: 15px;margin-top: 5px;">
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.date }}</div>
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.views }} views</div>
					</div>
			</div>

			
			
			
			
			<div class="card" :id="data._id" v-else>
				<div class="card_one">
					<div style="text-align: right;padding: 10px;position: absolute;right: 15px;font-size: 14px;"><a style="text-decoration:none;color:#0769F0;" href="#" @click.stop.prevent="opencategories()">{{ messagecategories }}</a></div>
					
					<div v-if="data.categories_title" class="card-header" :style="messageHeaderStyles">
						<div :class="data.color && data.color !== 'yellow' ? 'global-icon global-icon--white' : 'global-icon'"  style="margin-top: 15px;"></div>
						<span :style="messageHeaderFont" :class="{ 'clamp': clampComment }" v-html="messageTopicUrl" style="margin-top: 22px;"></span>
						<div class="topic-badge" v-if="data.topic">{{ messageTopicName }}</div>
					</div>

					<div v-else class="card-header" :style="messageHeaderStyles">
						<div :class="data.color && data.color !== 'yellow' ? 'global-icon global-icon--white' : 'global-icon'"></div>
						<span :style="messageHeaderFont" :class="{ 'clamp': clampComment }" style="margin-top: 7px;" v-html="messageTopicUrl"></span>
						<div class="topic-badge" v-if="data.topic">{{ messageTopicName }}</div>
					</div>
					
					<div class="card-body" style="min-height:auto;" @click.stop="openView()">

						<div style="padding-bottom: 10px;font-size:14px;" v-if="data.comment" v-html="messageTopiccomment"></div>
						
						<div style="border: 1px solid #E7E7E7;border-radius: 8px;" v-if="prepareFiles">
							<div class="d-flex flex-row flex-wrap">
								<div class="file" style="cursor:pointer;" v-for="(file, i) in prepareFiles" :key="i">

									<div class="file__image" @click.stop="openGallery(file)" v-if="file.type == 'image'">
										<img class="file__image" :src="file.preview">
									</div>

									<div class="file__image-group" @click.stop="openGallery(file.group[0])" v-if="file.type == 'image_group'">
										<img class="file__image" :src="file.group[0].preview">
										<span class="file__image-group-count">
											{{ '+' + file.group.length }}
										</span>
									</div>

									<video :poster="file.preview" class="file__video w-100" controls :src="file.url" v-if="file.type == 'video'"></video>

									<iframe class="file__iframe w-100" :src="file.url" v-if="file.type == 'iframe'" frameborder="0" allowfullscreen></iframe>

									<div class="file__file bg-primary" v-if="file.type == 'file'" @click.stop="openFile(file.url)">
										<i class="mdi mdi-file-document text-white" style="font-size:42px;"></i>
									</div>

									<div class="file__file bg-primary" v-if="file.type == 'audio'" @click.stop="toggleAudio(file.url)">
										<i class="mdi mdi-music text-white" style="font-size:42px;"></i>
									</div>

								</div>
							</div>				
							
							<div class="card-title font-weight-bold pl-4 mt-2 mb-3" v-if="data.title">{{ messageTopictitle }}</div>
							
							<div class="d-flex flex-row align-items-center pl-4" v-if="data.url && data.site_name">
								<div class="d-flex flex-column">
									<div class="d-flex flex-row">
										<a href="#" @click.stop.prevent="openLink(data.url, '_blank')" v-html="messageTopicSitename"></a>
									</div>

								</div>
							</div>
							
							<p class="card-text mx-4 mt-2 mb-4" style="font-size:14px;" v-if="data.description">{{ messageTopicdescription }}</p>
						</div>
					</div>

					<div style="border-top:1px solid #E7E7E7;padding-top: 10px;">
						<div class="mdi ellipse_right_bar_msg mdi-close text-secondary" 
							style="cursor:pointer;font-size:20px;float: right;" 
							v-if="$auth.check(['editor']) || ($auth.check(['creator']) && $auth.user()._id == data.user_id)"
							@click="removeMessage(data)"></div>

						<div class="mdi ellipse_right_bar_msg mdi-pencil"
							:class="{ 
								'text-primary': passedData && passedData._id == data._id, 
								'text-secondary': !passedData
							}"
							style="cursor:pointer;font-size:20px;float: right;"
							v-if="$auth.check(['editor']) || ($auth.check(['creator']) && $auth.user()._id == data.user_id)"
							@click="editMessage(data)"></div>
							

						<div class="text-secondary mdi ellipse_right_bar_msg mdi-email-outline"
							style="cursor:pointer;font-size:20px;float: right;"
							v-if="$auth.check(['editor'])"
							@click="postnow(data)"></div>					

							<div class="data_attached" v-if="data.attached">
								<div style="font-size:10px;"><b>{{ attached_time }}</b></div>
								<div style="font-size:8px;">{{ attached_date }}</div>
							</div>
							
							
						<div v-show="popup1" class="popup1">
							<div @click="postnow(data)">
								<i class="mdi mdi-email-outline" style="vertical-align: middle;font-size:20px;margin-right:5px;"></i>	
								Post now
							</div>
							<div @click="postlater()">
								<i class="mdi mdi-clock" style="vertical-align: middle;font-size:20px;margin-right:5px;"></i> 
								Post later
							</div>
						</div>
						
						<div v-show="popup2" class="popup2">
							<div style="float:right;margin-top: -7px;"><i class="mdi mdi-close" style="font-size:24px;color: #cacaca;" @click="closepopup()"></i></div>
							<div>
								<i class="mdi mdi-clock" style="float:left;font-size: 20px;color: #cacaca;vertical-align: middle;margin-top: -3px;"></i> 
								<div style="float: left;margin-left: 7px;color: #000;font-size: 16px;">Shedule post</div>
							</div>
							
							<div style="clear:both;"></div>
							
							<div style="margin-top: 10px;">Date</div>
							
							<div style="margin-top: 10px;">
							<select :id="'day' + data._id" style="background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="01">1</option>
								<option value="02">2</option>
								<option value="03">3</option>
								<option value="04">4</option>
								<option value="05">5</option>
								<option value="06">6</option>
								<option value="07">7</option>
								<option value="08">8</option>
								<option value="09">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
							</select>
							
							<select :id="'month' + data._id" style="margin-left:10px;background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="01">January</option>
								<option value="02">February</option>
								<option value="03">March</option>
								<option value="04">April</option>
								<option value="05">May</option>
								<option value="06">June</option>
								<option value="07">July</option>
								<option value="08">August</option>
								<option value="09">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</select>
							
							<select :id="'year' + data._id" style="margin-left:10px;background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="2020">2020</option>
								<option value="2021">2021</option>
								<option value="2022">2022</option>
								<option value="2023">2023</option>
								<option value="2024">2024</option>
							</select>				
							</div>
							
							<div style="margin-top: 15px;">Time</div>
							<div style="margin-top: 10px;">
							<select :id="'hour' + data._id" style="background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="00">00</option>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
							</select>
							
							<select :id="'minute' + data._id" style="margin-left:10px;background: #f4f4f4;border: 0px;padding: 2px;color: #6d7276;">
								<option value="00">00</option>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
								<option value="32">32</option>
								<option value="33">33</option>
								<option value="34">34</option>
								<option value="35">35</option>
								<option value="36">36</option>
								<option value="37">37</option>
								<option value="38">38</option>
								<option value="39">39</option>
								<option value="40">40</option>
								<option value="41">41</option>
								<option value="42">42</option>
								<option value="43">43</option>
								<option value="44">44</option>
								<option value="45">45</option>
								<option value="46">46</option>
								<option value="47">47</option>
								<option value="48">48</option>
								<option value="49">49</option>
								<option value="50">50</option>
								<option value="51">51</option>
								<option value="52">52</option>
								<option value="53">53</option>
								<option value="54">54</option>
								<option value="55">55</option>
								<option value="56">56</option>
								<option value="57">57</option>
								<option value="58">58</option>
								<option value="59">59</option>
							</select>
							</div>
							<br>
							<div style="float:left;margin-left:60px;" @click="resetpost(data._id)">Reset</div> 
							<div style="float:left;margin-left:50px;color:#1b89fc;" @click="savepost(data)">Save</div>
						</div>
							
					</div>							

				</div>	

					<div style="margin-right: 15px;margin-top: 5px;">
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.date }}</div>
						<div class="text-secondary ml-1" style="color: rgba(51, 51, 51, 0.2);float:right;font-size:10px;">{{ data.views }} views</div>
					</div>
			</div>		

			<div v-show="fons" style="position: fixed;z-index: 103;top: 0px;left: 0px;width: 100%;height: 100%;background: #000;opacity: 0.3;"></div>
		</div>
		
</template>
<script>
import SystemConsts from '../utils/const.js'
import ImageGallery from '../components/image_gallery.vue'

export default {
    components: { ImageGallery },
    props: {
        data: {
            type: Object,
            default: {}
        },
        sideIcons: {
            type: Boolean,
            default: true
        },
        messageControlIcons: {
            type: Boolean,
            default: true
        },
        passedData: {
            type: Object,
            default: null
        },
        clampComment: {
            type: Boolean,
            default: true
        },
        unreadMessages: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            topics: SystemConsts.topics,
            colors: SystemConsts.colors,
            active: {
                view: false,
                gallery: false,
                gallery_file: null
            },
            audio: null,
			comment:null,
			fons: null,
			popup1: null,
			popup2: null,
			postMessages:null
        }
    },
    computed: {
        prepareFiles() {
            let app = this
            let files = []
            let image_group = []
            let other_files = app.prepareOtherFiles
            let images = app.prepareImages

            files = files.concat(other_files)

            images.forEach((image, i) => {
                if (i < 3) {
                    files.push(image)
                } else if (images.length == 4) {
                    files.push(image)
                } else {
                    image_group.push(image)
                }
            })

            if (image_group.length) {
                files.push({
                    type: 'image_group',
                    group: image_group
                })
            }

            return files.length ? files : null
        },
        prepareOtherFiles() {
            let app = this
            let files = app.data.files.filter(file => {
                return file.type != 'image'
            })
            return files
        },
        prepareImages() {
            let app = this
            let images = app.data.files.filter(file => {
                return file.type == 'image'
            })
            return images
        },
        messageTopicName() {
            let app = this

            let name = ''
            app.topics.filter(item => { 
                if (item.name == app.data.topic) {
                    name = item.text
                }
            })
            return name
        },
		messagecategories () {
            let app = this
			console.log(app.data)
			var params = window
			.location
			.search
			.replace('?','')
			.split('&')
			.reduce(
				function(p,e){
					var a = e.split('=');
					p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
					return p;
				},
				{}
			);

			var langs=params['lang'] ? params['lang'] : 'en'

			if (app.data.categories_title) eval("name = app.data.categories_title.title_"+langs);
			
			else name='';
			
			return name

		},
		messageTopiccomment() {

            let app = this
            let name = app.data.comment_ru
			var params = window
			.location
			.search
			.replace('?','')
			.split('&')
			.reduce(
				function(p,e){
					var a = e.split('=');
					p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
					return p;
				},
				{}
			);
					
			var langs=params['lang'] ? params['lang'] : 'en'
			
			if (langs && !app.data.websocket) {
				eval("name = app.data.comment_"+langs);
			}
			
			if (name) {
				app.comment = true
				name = name.replace(/(?:\r\n|\r|\n)/g, '<br />');
				var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
				name=name.replace(exp, "<a target='_blank' href='$1'>$1</a>");
				var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
				name=name.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');			
			}
				else app.comment = null

            return name
        },	
		messageTopicUrl () {

			let app = this
			let name = window.location.hostname.split('.').reverse();
			let str= name[1]
			return str[0].toUpperCase() + str.slice(1);
		},
		messageTopiccommentspecial() {

            let app = this
            let name = app.data.special_post_ru
			var params = window
			.location
			.search
			.replace('?','')
			.split('&')
			.reduce(
				function(p,e){
					var a = e.split('=');
					p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
					return p;
				},
				{}
			);
					
			var langs=params['lang'] ? params['lang'] : 'en'
			
			if (langs && !app.data.websocket) {
				eval("name = app.data.special_post_"+langs);
			}

            return name
        },	
		messageTopicSitename () {
            let app = this
            let name = '<img style="width: 16px;" src="'+app.data.favicon+'"> '+app.data.site_name;

            return name
		},
        messageTopictitle() {
            let app = this
            let name = app.data.title_ru

			var params = window
			.location
			.search
			.replace('?','')
			.split('&')
			.reduce(
				function(p,e){
					var a = e.split('=');
					p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
					return p;
				},
				{}
			);
					
			var langs=params['lang'] ? params['lang'] : 'en'
			
			if (langs && !app.data.websocket) {
				eval("name = app.data.title_"+langs);
			}

            return name
        },	
        messageTopicdescription() {
            let app = this
            let name = app.data.description_ru

			var params = window
			.location
			.search
			.replace('?','')
			.split('&')
			.reduce(
				function(p,e){
					var a = e.split('=');
					p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
					return p;
				},
				{}
			);
					
			var langs=params['lang'] ? params['lang'] : 'en'

			if (langs && !app.data.websocket) {
				eval("name = app.data.description_"+langs);
			}
			
			if (name) {
				app.description = true
				var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
				name=name.replace(exp, "<a target='_blank' href='$1'>$1</a>");
				var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
				name=name.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');			
			}
				else app.description = null

            return name
        },		
        attached_time() {
            let app = this
            let attached = app.data.attached
			if (attached) {
				attached=attached.split(" ");
				return attached[1]
			}
        },	
        attached_date() {
            let app = this
            let attached = app.data.attached
			if (attached) {
				attached=attached.split(" ");
				return attached[0]
			}
        },			
        messageHeaderStyles() {
            let app = this
            let bg = '#fff'
            let styles = []

            app.colors.filter(item => { 
                if (item.name == app.data.color) {
                    bg = item.hex
                }
            })

            styles.push(`background-color:${ bg };`)

            if (!(app.data.url && app.data.site_name) && !app.data.title && !app.data.files.length && !app.data.description) {
                styles.push('border-radius: 20px 20px 20px 0;')
            }

            return styles.join('')
        },
        messageHeaderFont() {
            let app = this
            let font = '#000'

            app.colors.filter(item => { 
                if (item.name == app.data.color) {
                    font = item.font
                }
            })

            return `color:${ font };`
        },
        debounceSeencreateMessage() {
            return _.debounce((e) => {
                let app = this;
                axios.post('/create/'+ app.data._id +'/seen');
                app.data.views += 1;
            }, 3000);
        }
    },
    methods: {
	    resetpost(uid) {
            let app = this
			$('#day'+uid).val('01');
			$('#month'+uid).val('01');
			$('#year'+uid).val('2020');
			$('#hour'+uid).val('00');
			$('#minute'+uid).val('00');
        },		
	    savepost(datas) {
            let app = this

			let day = $('#day'+datas._id).val();
			let month = $('#month'+datas._id).val();
			let year = $('#year'+datas._id).val();
			let hour = $('#hour'+datas._id).val();
			let minute = $('#minute'+datas._id).val();
			
			datas.attached=year+'-'+month+'-'+day+' '+hour+':'+minute;

			axios.post('/create', datas)
			.then(response => {
				app.fons = !app.fons
				app.popup2 = !app.popup2
			}).catch(error => {
				app.fons = !app.fons
				app.popup2 = !app.popup2
			});	
        },
		postnow(datas) {
            let app = this

            $.confirm({
                title: 'Confirm',
                content: 'Are you sure you want to publish this post?',
                buttons: {
                    confirm: function () {
                        app.$emit('remove', datas)
						
						datas.create=1;
						datas.updated_at=new Date();
						datas.created_at=new Date();
						axios.post('/messages', datas)
						.then(response => {
							 window.ws.send(JSON.stringify({event: 'create', data: response.data.data}));
							 app.postMessages = !app.postMessages
						}).catch(error => {
							app.postMessages = !app.postMessages
						});

                    },
                    cancel: function () {}
                }
            }) 			

        },	
	    postMessage() {
            let app = this
            app.popup1 = !app.popup1
			app.postMessages = !app.postMessages
        },	
        closepopup() {
            let app = this
			app.fons = !app.fons
			app.popup2 = !app.popup2
        },		
        postlater() {
            let app = this
			app.fons = !app.fons
            app.popup1 = !app.popup1
			app.popup2 = !app.popup2
			app.postMessages = !app.postMessages
        },	
        openCard() {
            let app = this
			var params = window
			.location
			.search
			.replace('?','')
			.split('&')
			.reduce(
				function(p,e){
					var a = e.split('=');
					p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
					return p;
				},
				{}
			);
					
			var langs=params['lang'] ? params['lang'] : 'en'

			window.location.href='/create?lang='+langs;
			
            app.$router.push({ name: 'message', params: { id: app.data._id } , query: { lang: langs } })
        },
        openView() {
			let app = this
				var params = window
				.location
				.search
				.replace('?','')
				.split('&')
				.reduce(
					function(p,e){
						var a = e.split('=');
						p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
						return p;
					},
					{}
				);
						
				var langs=params['lang'] ? params['lang'] : 'en'

				if (app.data.url) {
					if (app.data.site_name == 'https://www.instagram.com') {
						window.open(app.data.url,"_blank");			
					} else {
						app.$router.push({ name: 'messagecreateView', params: { id: app.data._id }, query: { lang: langs } })
					}
				}
        },
        openLink(url, prop) {
            //window.open(url, prop);
        },
        openGallery(file) {
            let app = this
			
			if (app.data.url) {
				var params = window
				.location
				.search
				.replace('?','')
				.split('&')
				.reduce(
					function(p,e){
						var a = e.split('=');
						p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
						return p;
					},
					{}
				);
						
				var langs=params['lang'] ? params['lang'] : 'en'

				if (app.data.site_name == 'https://www.instagram.com') {
					window.open(app.data.url,"_blank");			
				} else {
					app.$router.push({ name: 'messagecreateView', params: { id: app.data._id }, query: { lang: langs } })
				}
			} else {
				app.active.gallery = true
				app.active.gallery_file = file			
			}
        },
        openFile(url) {
            //window.open(url, '_blank')
        },
        toggleAudio(url) {
            let app = this;

            if (app.audio) {
                app.audio.pause();
                app.audio = null;
            } else {
                app.audio = new Audio(url);
                app.audio.play();
                app.audio.addEventListener('ended', function() {
                    app.audio = null;
                });
            }
        },
        removeMessage(data) {
            let app = this

            $.confirm({
                title: 'Confirm',
                content: 'Are you sure you want to remove this post?',
                buttons: {
                    confirm: function () {
                        app.$emit('remove', data)
                    },
                    cancel: function () {}
                }
            })  
        },
        editMessage(data) {
            let app = this
            app.$emit('edit', data)
        },	
		seencreateMessage(e) {
            let app = this
            app.debounceSeencreateMessage(e);
            
            app.unreadMessages.forEach(function (elem, index) {
                if (elem._id == app.data._id) {
                    app.$delete(app.unreadMessages, index)
                }
            })
        },
    }

}
</script>
<style lang="scss" scoped>
    .card {
        width: 85%;
        max-width: 683px;
		min-height: 90px;
		border: none;
		background: none;
		margin-top: 40px;
    }
    .card_one {
        border-radius: 20px 20px 20px 0;
        background: #fff;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.14);
		
		&:before {
            content: '';
            width: 15px;
            height: 20px;
            position: absolute;
            bottom: 15px;
            left: -15px;
            background: url('data:image/svg+xml;utf8,<svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.26402 20H13V0C12.9318 7.9093 8.37227 14.9355 0.845214 17.5632C-0.49502618.0311 -0.156637 20 1.26402 20Z" fill="white"/></svg>') no-repeat right;
            background-size: cover;
        }
    }
	
    .card-header {
        border: none;
        padding: 1.5rem 2.75rem 1.5rem 2.75rem;
        border-radius: 20px 20px 0 0;
        white-space: pre-line;
		font-weight: bold; 
		
        .global-icon {
			width: 40px;
			height: 40px;
            position: absolute;
			top: 1.5rem;
			left: 1.0rem;
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
			border-radius: 40px;
			
            &--white {
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
            }
        }
		
        .global-icon-special {
            width: 42px;
            height: 40px;
            position: absolute;
            top: 7.5rem;
            left: 1.0rem;
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
			border-radius: 40px;
			
            &--white {
            background: url('../assets/icons/msg_icon2.png') no-repeat center;
			background-size: cover;
            }
        }
		
        span {
            font-size: 1.25rem;
            padding-left: 25px;

            &.clamp {
                display: block;
                @supports(display: -webkit-box) {
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

    .card-title {
        font-size: 1.167rem;
    }

    .card-text {
        max-height: 126px;
        overflow: hidden;
    }

    .file {
        flex: 1 1 50%;
        height: auto;
        min-height: 150px;
        border-radius: 10px 10px 0px 0px;

        &__image {
			width: 100%;
			margin: 0 auto;
			border-radius: 10px 10px 0px 0px;
			object-fit: cover;
			text-align: center;		
			
            &-group {
                width: 100%;
                height: 100%;
                position: relative;
                border-radius: 10px;

                .file__image {
                    position: absolute;
                }

                &-count {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    font-size: 24px;
                    line-height: 28px;
                    text-align: center;
                    color: #007bff;
                    position: relative;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 10px;
                }
            }
        }

        &__video {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
        }

        &__iframe {
            width: 100%;
            height: 100%;
            min-height: 280px;
            border: none;
        }

        &__file {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }
	.clamp_special {
		font-size: 1.25rem!important;	
		padding-left: 0px!important;	
	}
    .topic-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 76px;
        height: 76px;
        padding: 0 2px;
        position: absolute;
        border: 2px solid #EB5757;
        border-radius: 50%;
        top: -20px;
        right: -10px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        color: #000;
        text-align: center;
        background: #fff;
    }
	.card-title-special {
		color:#fff;
		text-align:center;
		font-size: 25px;
		background: #00A39F;
		padding:10px;
	}
	.ellipse_right_bar_msg {
		background: #fff;
		border-radius: 30px;
		margin-bottom: 10px;
		padding: 5px;
		text-align: center;
		width: 40px;
		height: 40px;
	}
	.card-body {
        padding: 0rem 1.25rem 1.25rem 1.25rem;
	}
	.popup1 {
		position: absolute;
		z-index: 1;
		top: 110px;
		left: -100px;
		width: 120px;
		height: 80px;
		background: #ffffff;
		border: 1px solid #767779;
		border-radius: 10px;
		padding: 10px;
		color: #767779;
		font-size: 14px;
	}
	.popup2 {
		position: fixed;
		z-index: 104;
		top: 30%;
		width: 260px;
		height: 230px;
		background: #ffffff;	
		padding:15px;
		border:1px solid #6c757d;
		border-radius:10px;
		color:#828991;
		font-weight: 600;
		margin:auto;
		left:0;
		right:0;
	}
	.data_attached {
		margin-left: -10px;
		background:#007bff;
		text-align:center;
		color:#fff;
		border-radius:5px;
		padding:5px;
	}
</style>
