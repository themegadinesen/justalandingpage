const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { email } = JSON.parse(event.body);

    try {
        const { data, error } = await supabase
            .from('waiting_list')
            .insert([{ email: email }]);

        if (error) throw error;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Signed up successfully!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

