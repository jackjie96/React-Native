export default class ApiHelper
{
	static getMethod(url)
	{
		return (
			new Promise((resolve, reject) =>
			{
				const headers = {
					method: 'GET',
	        mode: 'same-origin',
	        credentials: 'same-origin',
	        cache: 'no-cache',
	        headers: {
	          'Content-Type': 'application/json',
	        },
				};

				fetch(url, headers)
				.then(res =>
				{
					if (res.ok)
					{
						resolve(res.json());
					}
					else
					{
						reject('Api getMethod(ERROR): Network not ok');
					}
				})
				.catch(err =>{
					reject('Api getMethod(ERROR): ', err);
				});
			})
		);
	}

	static postMethod(url, formData)
	{
		return (
			new Promise((resolve, reject) =>
			{
				const headers = 
				{
	        method: 'POST',
	        mode: 'same-origin',
	        credentials: 'same-origin',
	        cache: 'no-cache',
	        headers: {
	          'Content-Type': 'multipart/form-data',
	        },
	        body: formData,
	      };

	      fetch(url, headers)
	      .then(res =>
	      {
	      	if (res.ok)
	      	{
	      		resolve(res.json());
	      	}
	      	else
	      	{
	      		reject('Api postMethod(ERROR): Network not ok');
	      	}
	      })
	      .catch(err =>
	      {
	      	reject('Api postMethod(ERROR): ', err);
	      });
			})
		);
	}
}